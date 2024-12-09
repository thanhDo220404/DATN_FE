const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/carts`;

const addToCart = async (body) => {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Chuyển đối tượng body thành JSON
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Trả về dữ liệu kết quả từ backend
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng: ", error);
    throw error; // Có thể ném lỗi để xử lý bên ngoài hàm này nếu cần
  }
};

const getCartByUserId = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`); // Gọi API

    if (!response.ok) {
      throw new Error("Lỗi khi lấy giỏ hàng");
    }

    const result = await response.json(); // Phân tích dữ liệu JSON
    return result; // Trả về giỏ hàng
  } catch (error) {
    console.error("Lỗi:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác
  }
};

const deleteCart = async (id) => {
  try {
    // Gửi yêu cầu xóa đến API
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra xem yêu cầu có thành công không
    if (!response.ok) {
      throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }

    // Nếu thành công, trả về một thông điệp hoặc bất kỳ dữ liệu nào nếu cần
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm
  }
};

const getCartItemById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Lỗi khi lấy sản phẩm trong giỏ hàng");
    }

    const cartItemData = await response.json();
    return cartItemData;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy sản phẩm trong giỏ hàng:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm này nếu cần
  }
};

const updateCartItemById = async (id, body) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Nếu không phải là mã trạng thái thành công, ném lỗi
      throw new Error(`Lỗi: ${response.statusText}`);
    }

    const updatedCartItem = await response.json();
    return updatedCartItem; // Trả về sản phẩm trong giỏ hàng đã được cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
    throw error; // Ném lỗi lên để xử lý ở nơi khác nếu cần
  }
};

const updateCartQuantity = async (id, quantity) => {
  try {
    const response = await fetch(`${apiUrl}/${id}/quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }), // Gửi số lượng dưới dạng JSON
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.statusText}`);
    }

    const updatedCart = await response.json(); // Phân tích dữ liệu JSON
    return updatedCart; // Trả về giỏ hàng đã được cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:", error);
    throw error; // Ném lỗi lên để xử lý ở nơi khác nếu cần
  }
};

export {
  addToCart,
  getCartByUserId,
  deleteCart,
  getCartItemById,
  updateCartItemById,
  updateCartQuantity,
};
