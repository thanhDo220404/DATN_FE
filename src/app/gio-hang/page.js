"use client";
import { useEffect, useState } from "react";
import { deleteCart, getCartByUserId } from "../databases/cart";
import { getCookie } from "../lib/CookieManager";
import { parseJwt } from "../databases/users";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [payload, setPayload] = useState();

  const fetchCart = async (userId) => {
    const result = await getCartByUserId(userId);
    setCarts(result);
    console.log("Dữ liệu giỏ hàng: ", result);
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      setPayload(parseJwt(token));
    }
  }, []);
  useEffect(() => {
    if (payload && payload._id) {
      fetchCart(payload._id); // Chỉ gọi khi payload có giá trị và payload._id tồn tại
    }
  }, [payload]);

  const handleDelete = async (id) => {
    await deleteCart(id);
    if (payload && payload._id) {
      fetchCart(payload._id); // Chỉ gọi khi payload có giá trị và payload._id tồn tại
    }
    // console.log(id);
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = carts.reduce(
    (total, item) =>
      total +
      (item.product.items.price - item.product.items.discount) *
        item.product.items.variations.quantity,
    0
  );

  return (
    <>
      <div className="container mt-5 kShopping">
        <div className="row">
          {/* Shopping Cart Items */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center Shopping-Cart">
              <h4>Giỏ Hàng</h4>
              <span>Số lượng: {carts.length}</span>
            </div>
            {carts.map((cartItem) => (
              <div
                className="cart-item d-flex justify-content-between align-items-center"
                key={cartItem._id}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={cartItem.product.items.image.mediaFilePath}
                    alt={cartItem.product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <span>
                      {cartItem.product.name}
                      <br />
                      <small>
                        {cartItem.product.items.color.colorName} -{" "}
                        {cartItem.product.items.variations.size.sizeName}
                      </small>
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={cartItem.product.items.variations.quantity} // Hiển thị số lượng từ variations
                    min={1}
                    style={{ width: "60px" }}
                  />
                </div>
                <div>
                  {(
                    cartItem.product.items.price -
                    cartItem.product.items.discount
                  ).toLocaleString()}{" "}
                  ₫
                </div>{" "}
                {/* Giá sản phẩm */}
                <div>
                  <button
                    className="text-danger"
                    onClick={() => handleDelete(cartItem._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="col-md-4">
            <div className="cart-summary">
              <h4>Tổng Quan</h4>
              <p>
                Số lượng: <span className="float-end">{carts.length}</span>
              </p>
              <p>
                Giao hàng:
                <select className="form-select">
                  <option selected>Giao hàng tiêu chuẩn - 5.000 ₫</option>
                  <option>Giao hàng nhanh - 10.000 ₫</option>
                </select>
              </p>
              <p>
                Mã giảm giá:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã của bạn"
                />
              </p>
              <hr />
              <p>
                Tổng giá:{" "}
                <span className="float-end">
                  {(totalPrice + 5000).toLocaleString()} ₫
                </span>{" "}
                {/* Giá tổng nếu chọn giao hàng tiêu chuẩn */}
              </p>
              <button className="btn btn-dark">Thanh Toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
