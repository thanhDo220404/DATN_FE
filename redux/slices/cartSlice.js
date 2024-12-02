// store/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  getCartByUserId,
  deleteCart,
  updateCartItemById,
  updateCartQuantity,
} from "@/app/databases/cart";

// Async thunks cho các hành động liên quan đến giỏ hàng
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const cartItems = await getCartByUserId(userId);
      return cartItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const newCartItem = await addToCart(productData);
      return newCartItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const deletedCartItem = await deleteCart(cartId);
      return deletedCartItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const updatedCartItem = await updateCartQuantity(cartId, quantity);
      return updatedCartItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Tạo slice cho cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchCartByUserId
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý addProductToCart
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý removeProductFromCart
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItemIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (updatedItemIndex !== -1) {
          state.items[updatedItemIndex] = action.payload;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
