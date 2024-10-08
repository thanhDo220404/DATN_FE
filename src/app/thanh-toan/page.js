"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [shippingMethodOpen, setShippingMethodOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const pricePerItem = 500000; // Giá mỗi sản phẩm

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");

  const togglePaymentMethod = () => {
    setPaymentMethodOpen((prev) => !prev);
  };

  const toggleShippingMethod = () => {
    setShippingMethodOpen((prev) => !prev);
  };

  // Tính toán tổng tiền
  const totalPrice = quantity * pricePerItem;
  const formattedPrice = totalPrice.toLocaleString("en-US");

  const onSubmit = (data) => {
    if (!selectedPaymentMethod || !selectedShippingMethod) {
      alert("Vui lòng chọn phương thức thanh toán và đơn vị vận chuyển.");
      return;
    }

    console.log("Thông tin thanh toán hợp lệ!", {
      ...data,
      quantity,
      totalPrice,
      selectedPaymentMethod,
      selectedShippingMethod,
    });
  };

  // Hàm tăng số lượng
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Hàm giảm số lượng
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Đảm bảo số lượng không nhỏ hơn 1
  };

  return (
    <div className="checkout-page container mt-5">
      <div className="row">
        {/* Khung 1: Thông tin giao hàng */}
        <div className="col-md-6">
          <h3>Thông tin giao hàng</h3>
          <p>
            Bạn đã có tài khoản? <a href="/dang-ky">Đăng ký/Đăng nhập</a>
          </p>

          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">Vui lòng điền đầy đủ thông tin.</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Các input form để lấy thông tin */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Họ và tên:</label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: "Vui lòng nhập họ và tên." })}
                className="form-control"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Số điện thoại:</label>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber", { 
                  required: "Vui lòng nhập số điện thoại.",
                  pattern: {
                    value: /^0\d{9}$/,
                    message: "Số điện thoại phải bắt đầu bằng số 0 và có đủ 10 chữ số."
                  }
                })}
                className="form-control"
                placeholder="Nhập số điện thoại"
              />
              {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                {...register("email", { 
                  required: "Vui lòng nhập email.", 
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.(com)$/,
                    message: "Email phải đúng định dạng (bao gồm @ và .com)."
                  }
                })}
                className="form-control"
                placeholder="Nhập email"
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Địa chỉ giao hàng:</label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Vui lòng nhập địa chỉ." })}
                className="form-control"
                placeholder="Nhập địa chỉ"
              />
              {errors.address && <p className="text-danger">{errors.address.message}</p>}
            </div>

            {/* Phần mã giảm giá và ghi chú chung một hàng */}
            <div className="row">
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="discountCode" className="form-label">Mã giảm giá:</label>
                  <input
                    type="text"
                    id="discountCode"
                    {...register("discountCode")}
                    className="form-control"
                    placeholder="Nhập mã giảm giá (nếu có)"
                  />
                </div>
              </div>

              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">Ghi chú:</label>
                  <textarea
                    id="notes"
                    {...register("notes")}
                    className="form-control"
                    rows="3"
                    placeholder="Nhập ghi chú (nếu có)"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="payment-method-group mb-3 d-flex justify-content-between align-items-center">
              <label>Phương thức thanh toán:</label>
              <div className={`payment-method-group ${paymentMethodOpen ? 'open' : ''}`}>
                <button type="button" onClick={togglePaymentMethod} className="btn btn-link">
                  {selectedPaymentMethod || "Phương thức thanh toán"}
                </button>
                {paymentMethodOpen && (
                  <div className="submenu border p-3 mt-2">
                    <div className="submenu-item">
                      <button
                        type="button"
                        className={`btn ${selectedPaymentMethod === "cod" ? "active" : ""}`}
                        onClick={() => {
                          setSelectedPaymentMethod("Thanh toán khi nhận hàng (COD)");
                          togglePaymentMethod();
                        }}
                      >
                        Thanh toán khi nhận hàng (COD)
                      </button>
                    </div>
                    <div className="submenu-item">
                      <button
                        type="button"
                        className={`btn ${selectedPaymentMethod === "credit" ? "active" : ""}`}
                        onClick={() => {
                          setSelectedPaymentMethod("Thẻ tín dụng / Ghi nợ");
                          togglePaymentMethod();
                        }}
                      >
                        Thẻ tín dụng / Ghi nợ
                      </button>
                    </div>
                    <div className="submenu-item">
                      <button
                        type="button"
                        className={`btn ${selectedPaymentMethod === "momo" ? "active" : ""}`}
                        onClick={() => {
                          setSelectedPaymentMethod("Ví MoMo");
                          togglePaymentMethod();
                        }}
                      >
                        Ví MoMo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Đơn vị vận chuyển */}
            <div className="shipping-method-group mb-3 d-flex justify-content-between align-items-center">
              <label>Đơn vị vận chuyển:</label>
              <div className={`shipping-method-group ${shippingMethodOpen ? 'open' : ''}`}>
                <button type="button" onClick={toggleShippingMethod} className="btn btn-link">
                  {selectedShippingMethod || "Đơn vị vận chuyển"}
                </button>
                {shippingMethodOpen && (
                  <div className="submenu1 border p-3 mt-2">
                    <div className="submenu-item">
                      <button
                        type="button"
                        className={`btn ${selectedShippingMethod === "fast" ? "active" : ""}`}
                        onClick={() => {
                          setSelectedShippingMethod("Giao hàng nhanh");
                          toggleShippingMethod();
                        }}
                      >
                        Giao hàng nhanh
                      </button>
                    </div>
                    <div className="submenu-item">
                      <button
                        type="button"
                        className={`btn ${selectedShippingMethod === "economy" ? "active" : ""}`}
                        onClick={() => {
                          setSelectedShippingMethod("Giao hàng tiết kiệm");
                          toggleShippingMethod();
                        }}
                      >
                        Giao hàng tiết kiệm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Tiến hành thanh toán
            </button>
          </form>
        </div>

         {/* Khung 2: Chi tiết giỏ hàng */}
         <div className="col-md-6">
         <h3>Giỏ hàng của bạn</h3>
         <div className="cart-item">
           <div className="item-info d-flex justify-content-between align-items-center">
             <div className="d-flex align-items-center">
               <img src="/images/dm_1.jpg" alt="Sản phẩm A" className="img-fluid me-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
               <div>
                 <h5 className="item-name">Sản phẩm A</h5>
                 <div className="item-price">{formattedPrice} VNĐ</div>
                 <div className="quantity-controls">
                   <button className="btn1 btn-secondary" onClick={decrementQuantity}>-</button>
                   <span className="mx-2">{quantity}</span>
                   <button className="btn1 btn-secondary" onClick={incrementQuantity}>+</button>
                 </div>
               </div>
             </div>
             
           </div>
         </div>

         <div className="total-price mt-3">
           <h5>Tổng tiền: {formattedPrice} VNĐ</h5>
         </div>
       </div>
     </div>
   </div>
 );
}