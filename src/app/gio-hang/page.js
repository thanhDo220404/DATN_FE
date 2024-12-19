"use client";
import { useEffect, useState } from "react";
import { updateCartQuantity } from "../databases/cart";
import { getCookie } from "../lib/CookieManager";
import { parseJwt } from "../databases/users";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAllProducts } from "../databases/products";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByUserId,
  removeProductFromCart,
  updateCartItemQuantity,
} from "../../../redux/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [listProducts, setListProducts] = useState([]);
  const [payload, setPayload] = useState();
  const [listCheckout, setListCheckout] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

  let carts = useSelector((state) => state.cart.items);

  const router = useRouter();

  const fetchProducts = async () => {
    const result = await getAllProducts();
    setListProducts(result);
  };

  const fetchCart = async (userId) => {
    const res = await dispatch(fetchCartByUserId(userId));
    const result = res.payload;

    // Duyệt qua từng sản phẩm trong giỏ hàng
    result.map(async (cartItem) => {
      const productInList = listProducts.find(
        (product) => product._id === cartItem.product._id
      );

      // Kiểm tra nếu sản phẩm tồn tại trong danh sách sản phẩm
      if (productInList) {
        const itemInProduct = productInList.items.find(
          (item) => item._id === cartItem.product.items._id
        );

        const variationInItem = itemInProduct.variations.find(
          (item) => item._id === cartItem.product.items.variations._id
        );

        if (!variationInItem) {
          if (cartItem._id) {
            dispatch(removeProductFromCart(cartItem._id)); // Gọi hàm deleteCart để xóa sản phẩm khỏi giỏ hàng
            return;
          }
        }

        const availableQuantity = variationInItem?.quantity || 0;

        // Nếu số lượng có sẵn nhỏ hơn hoặc bằng 0, xóa sản phẩm khỏi giỏ hàng
        if (availableQuantity <= 0) {
          if (cartItem._id) {
            dispatch(removeProductFromCart(cartItem._id)); // Gọi hàm deleteCart để xóa sản phẩm khỏi giỏ hàng
            return;
          }
        }

        // Nếu số lượng trong giỏ hàng lớn hơn số lượng có sẵn, điều chỉnh lại số lượng
        if (cartItem.product.quantity > availableQuantity) {
          if (cartItem._id) {
            dispatch(
              updateCartItemQuantity({
                cartId: cartItem._id,
                quantity: availableQuantity,
              })
            ); // Gọi hàm deleteCart để xóa sản phẩm khỏi giỏ hàng
            return;
          }
        }
      }
    });
  };

  useEffect(() => {
    fetchProducts();
    const token = getCookie("LOGIN_INFO");
    if (token) {
      setPayload(parseJwt(token));
    }
  }, []);

  useEffect(() => {
    if (payload && payload._id) {
      if (listProducts.length > 0) {
        fetchCart(payload._id);
      }
    }
  }, [payload, listProducts]);

  const handleDelete = async () => {
    const id = selectedCart._id;
    dispatch(removeProductFromCart(id));
    const modal = document.getElementById("deleteCart");
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    // Cập nhật listCheckout
    setListCheckout((prevList) =>
      prevList.filter((checkoutItem) => checkoutItem._id !== id)
    );

    if (payload && payload._id) {
      fetchCart(payload._id);
    }
  };

  const handleQuantityChange = async (cart, newQuantity) => {
    const cartId = cart._id;
    // Tìm cartItem trong giỏ hàng theo cartId
    const cartItem = carts.find((item) => item._id === cartId);

    // Tìm sản phẩm trong listProducts
    const productInList = listProducts.find(
      (product) => product._id === cartItem.product._id
    );

    // Tìm item tương ứng trong sản phẩm
    const itemInProduct = productInList.items.find(
      (item) => item._id === cartItem.product.items._id
    );

    // Tìm variation tương ứng trong item
    const variationInItem = itemInProduct.variations.find(
      (variation) => variation._id === cartItem.product.items.variations._id
    );

    // Lấy số lượng tối đa từ variation
    const maxQuantity = variationInItem.quantity || 0;

    // Kiểm tra xem newQuantity có vượt quá maxQuantity không
    if (newQuantity > maxQuantity) {
      // Hiển thị thông báo lỗi nếu số lượng vượt quá
      newQuantity = maxQuantity;
      toast.error(`Bạn chỉ có thể mua tối đa ${maxQuantity} sản phẩm`);
      return; // Ngừng thực hiện các bước tiếp theo nếu số lượng không hợp lệ
    }

    // Nếu newQuantity = 0, gọi hàm handleDelete
    if (newQuantity === 0) {
      setSelectedCart(cart);
      const modal = document.getElementById("deleteCart");
      // Sử dụng getOrCreateInstance để đảm bảo modal được khởi tạo
      const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.show();
      } else {
        console.error(
          "Modal không được khởi tạo hoặc không tồn tại trong DOM."
        );
      }
      return;
    }
    if (newQuantity < 0) {
      newQuantity = 1;
    }

    // Giới hạn số lượng tối đa
    newQuantity = Math.min(newQuantity, maxQuantity);

    // Cập nhật lại listCheckout
    setListCheckout((prevList) => {
      return prevList.map((checkoutItem) =>
        checkoutItem._id === cartId
          ? {
              ...checkoutItem,
              product: {
                ...checkoutItem.product,
                quantity: newQuantity, // Cập nhật số lượng bên trong product
              },
            }
          : checkoutItem
      );
    });

    try {
      const updatedCart = await updateCartQuantity(cartId, newQuantity);
      toast.success("Giỏ hàng đã được cập nhật!");
      if (payload && payload._id) {
        fetchCart(payload._id);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng giỏ hàng:", error.message);
    }
  };

  const handleCheckoutChange = (cartItem, isChecked) => {
    if (isChecked) {
      setListCheckout((prevList) => [...prevList, cartItem]);
    } else {
      setListCheckout((prevList) =>
        prevList.filter((item) => item._id !== cartItem._id)
      );
    }

    // Kiểm tra trạng thái checkbox "Chọn tất cả"
    if (carts.length === listCheckout.length + (isChecked ? 1 : -1)) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setIsAllChecked(isChecked);
    setListCheckout(isChecked ? carts : []);
  };

  // Cập nhật trạng thái của isAllChecked mỗi khi listCheckout thay đổi
  useEffect(() => {
    setIsAllChecked(listCheckout.length === carts.length && carts.length > 0);
  }, [listCheckout, carts.length]);

  const totalCheckoutPrice = listCheckout.reduce(
    (total, item) =>
      total +
      item.product.items.price *
        (1 - item.product.items.discount / 100) *
        item.product.quantity,
    0
  );

  const handleCheckout = () => {
    if (listCheckout.length === 0) {
      setWarningMessage("Chưa chọn sản phẩm nào để mua!");
      return;
    }
    setWarningMessage(""); // Reset warning message if there's items in checkout
    // Thực hiện logic mua hàng tại đây
    localStorage.setItem("checkoutData", JSON.stringify(listCheckout));
    // const data = encodeURIComponent(JSON.stringify(listCheckout));
    router.push(`/thanh-toan?next=${pathname}`);
  };

  return (
    <>
      <div className="container my-5">
        <ToastContainer></ToastContainer>
        <div className="row position-relative">
          <div className="col-md-12 bg-white p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Giỏ Hàng</h4>
              <span>Số lượng sản phẩm: {carts.length}</span>
            </div>
            <table className="table table-borderless align-middle">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col" className="text-center">
                    Giá
                  </th>
                  <th scope="col" className="text-center">
                    Số lượng
                  </th>
                  <th scope="col" className="text-center">
                    Số tiền
                  </th>
                  <th scope="col" className="text-center">
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody className="border-top">
                {carts.map((cartItem) => {
                  const price =
                    cartItem.product.items.price *
                    (1 - cartItem.product.items.discount / 100);
                  const total = price * cartItem.product.quantity;
                  const isChecked = listCheckout.some(
                    (item) => item._id === cartItem._id
                  );
                  return (
                    <tr key={cartItem._id} className="border-bottom">
                      <td>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleCheckoutChange(cartItem, e.target.checked)
                          }
                        />
                      </td>
                      <td>
                        <Link href={`/san-pham/${cartItem.product._id}`}></Link>
                        <div className="d-flex align-items-center">
                          <Link href={`/san-pham/${cartItem.product._id}`}>
                            <img
                              src={cartItem.product.items.image.mediaFilePath}
                              alt={cartItem.product.name}
                              className="rounded me-3"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </Link>

                          <div>
                            <p className="mb-1 fw-bold">
                              <Link href={`/san-pham/${cartItem.product._id}`}>
                                {cartItem.product.name}
                              </Link>
                            </p>
                            <small className="text-muted">
                              {cartItem.product.items.color.colorName} -{" "}
                              {cartItem.product.items.variations.size.sizeName}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {cartItem.product.items.discount > 0 && (
                          <del className="me-2 text-secondary">
                            {cartItem.product.items.price.toLocaleString()} ₫
                          </del>
                        )}
                        {price.toLocaleString()} ₫
                      </td>
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem,
                                Math.max(cartItem.product.quantity - 1)
                              )
                            }
                            style={{ width: "30px", height: "30px" }}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center mx-1"
                            value={cartItem.product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                cartItem,
                                parseInt(e.target.value)
                              )
                            }
                            style={{ width: "60px" }}
                          />
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem,
                                cartItem.product.quantity + 1
                              )
                            }
                            style={{ width: "30px", height: "30px" }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center fw-bold text-danger">
                        {total.toLocaleString()} ₫
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-link text-danger p-0"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCart"
                          onClick={() => setSelectedCart(cartItem)}
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="col-md-12 position-sticky mt-3 bottom-0 z-3 bg-white p-3 shadow-lg">
            {warningMessage && (
              <div className="text-danger mt-2">{warningMessage}</div>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <input
                  className="me-2"
                  id="selectAll"
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll" className="mb-0">
                  Chọn tất cả
                </label>
              </div>

              <div className="text-center">
                <span className="fw-bold">
                  Tổng thanh toán ({listCheckout.length} sản phẩm):{" "}
                </span>
                <span className="text-danger fw-bold">
                  {totalCheckoutPrice.toLocaleString()} ₫
                </span>
              </div>

              <button className="btn btn-primary" onClick={handleCheckout}>
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Xác nhận xóa sản phẩm khỏi giỏ hàng --> */}
      <div
        className="modal fade"
        id="deleteCart"
        tabIndex="-1"
        aria-labelledby="deleteCartLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-danger" id="deleteCartLabel">
                Bạn chắc chắn muốn bỏ sản phẩm này?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedCart
                ? `${selectedCart.product.name} (${selectedCart.product.items.color.colorName}, ${selectedCart.product.items.variations.size.sizeName})`
                : "co deo dau"}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
