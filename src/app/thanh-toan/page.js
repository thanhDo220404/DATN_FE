"use client";
import React, { useEffect, useState } from "react";
import { getAllByUserId } from "../databases/address";
import Overlay from "../components/overlay";
import { useSearchParams } from "next/navigation";
import { getAllShippingMethods } from "../databases/shipping_methods";
import { createOrder } from "../databases/order";
import { deleteCart } from "../databases/cart";

export default function Checkout() {
  const [address, setAddress] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [listCheckout, setListCheckout] = useState({
    user: null,
    products: [],
  });
  const [order, setOrder] = useState({});

  const [shipping_methods, setShippingMethods] = useState([]);
  const [showShippingMethods, setShowShippingMethods] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));

  const fetchAddress = async (userId) => {
    const result = await getAllByUserId(userId);
    setAddress(result);
    const defaultAddr = result.find((addr) => addr.is_default);
    if (defaultAddr) {
      setDefaultAddress(defaultAddr);
      setSelectedAddressId(defaultAddr._id); // Đặt selectedAddressId là địa chỉ mặc định
    }
  };
  const fetchShippingMethods = async () => {
    const result = await getAllShippingMethods();
    setShippingMethods(result);
    setSelectedShippingMethod(result[0]);
  };

  useEffect(() => {
    if (data) {
      // Lấy thông tin người dùng từ data
      const userId = data[0].user._id; // Lấy _id của người dùng từ phần tử đầu tiên
      // Cập nhật listCheckout với user
      const products = data.map((item) => ({
        ...item.product, // Lấy sản phẩm từ item
        userId: userId, // Thêm thông tin user vào từng sản phẩm (nếu cần)
      }));

      setListCheckout({
        user: { _id: userId }, // Cập nhật thông tin người dùng
        products: products, // Cập nhật danh sách sản phẩm
      });
      fetchAddress(userId);
    }
    fetchShippingMethods();
  }, []);

  const handleShowSelectAddress = () => {
    setShowSelectAddress(true);
  };
  const handleShowSelectShippingMethods = () => {
    setShowShippingMethods(true);
  };

  const handleCloseSelectAddress = () => {
    setShowSelectAddress(false);
  };
  const handleCloseSelectShippingMethods = () => {
    setShowShippingMethods(false);
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleConfirmSelection = () => {
    const newDefaultAddress = address.find(
      (addr) => addr._id === selectedAddressId
    );
    if (newDefaultAddress) {
      setDefaultAddress(newDefaultAddress);
    }
    handleCloseSelectAddress();
  };

  const handleSelectShippingMethod = (method) => {
    setSelectedShippingMethod(method);
  };

  const handleOrder = async () => {
    const newOrder = {
      ...listCheckout,
      shipping_method: selectedShippingMethod,
      order_address: defaultAddress,
      order_total: totalAmount, // Tổng tiền đã tính toán
    };
    setOrder(newOrder);
    const result = await createOrder(newOrder);
    if (result && result._id) {
      for (const item of data) {
        await deleteCart(item._id); // Xóa từng sản phẩm trong giỏ hàng theo `data_id`
      }
      window.location.href = "/user/don-mua";
    } else {
      window.location.href = "/gio-hang";
    }
    console.log(newOrder);
  };

  const totalAmount =
    listCheckout.products.reduce((total, product) => {
      const price = product.items.price * (1 - product.items.discount / 100);
      const totalProduct = price * product.quantity;
      return total + totalProduct;
    }, 0) + (selectedShippingMethod?.price || 0);

  return (
    <>
      <div className="container-sm my-5 position-relative">
        {showSelectAddress && (
          <div className="position-fixed top-50 start-50 translate-middle w-100 h-100 p-3">
            <Overlay />
            <div className="position-relative top-50 start-50 w-75 translate-middle z-3">
              <div className="w-50 bg-white position-absolute top-50 start-50 translate-middle py-3">
                <div className="border-bottom pb-2">
                  <span className="ms-3 fs-5">Địa chỉ của tôi</span>
                </div>
                <div className="px-3">
                  {address.length > 0 ? (
                    address.map((addr) => (
                      <div
                        className="py-3 border-bottom border-dark-subtle"
                        key={addr._id}
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            <span className="fs-5">{addr.name}</span> |{" "}
                            <span>{addr.phone}</span>
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === addr._id} // Kiểm tra xem địa chỉ này có phải địa chỉ đã chọn không
                              onChange={() => handleSelectAddress(addr._id)}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div>{addr.specific_address}</div>
                            <div>{`${addr.address.name} - ${addr.address.district.name} - ${addr.address.district.ward.prefix} ${addr.address.district.ward.name}`}</div>
                            {addr.is_default && (
                              <span className="border border-primary p-1 text-primary">
                                Mặc định
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted">Bạn chưa có địa chỉ nào.</span>
                  )}
                </div>
                <div className="border-top pt-3">
                  <div className="float-end me-3">
                    <button
                      className="btn btn-secondary me-3"
                      onClick={handleCloseSelectAddress}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleConfirmSelection}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showShippingMethods && (
          <div className="position-fixed top-50 start-50 translate-middle w-100 h-100 p-3">
            <Overlay />
            <div className="position-relative top-50 start-50 w-75 translate-middle z-3">
              <div className="w-50 bg-white position-absolute top-50 start-50 translate-middle py-3">
                {/* Danh sách phương thức vận chuyển */}
                <div className="pt-3">
                  <span className="ms-3 fs-5">Phương thức vận chuyển</span>
                  <div className="px-3">
                    {shipping_methods.length > 0 ? (
                      shipping_methods.map((method) => (
                        <>
                          <div
                            style={{ cursor: "pointer" }}
                            className={`p-3 my-3 ${
                              selectedShippingMethod?._id === method._id
                                ? "border-start border-primary border-4 bg-body-secondary"
                                : ""
                            }`}
                            key={method._id}
                            onClick={() => handleSelectShippingMethod(method)} // Sửa chỗ này
                          >
                            <div>
                              <span className="fs-5">
                                {method.name}{" "}
                                <span className="ms-5 fw-bold text-primary">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(method.price)}
                                  {selectedShippingMethod?._id ===
                                    method._id && (
                                    <span className="text-primary float-end fs-4">
                                      <i className="bi bi-check2"></i>
                                    </span>
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <span className="text-muted">
                        Không có phương thức vận chuyển nào.
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-top pt-3">
                  <div className="float-end me-3">
                    <button
                      className="btn btn-secondary me-3"
                      onClick={handleCloseSelectShippingMethods}
                    >
                      Xong
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-center">Thanh toán</h1>

        <div className="bg-white w-100 mt-3">
          <div
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)",
              height: "3px",
              width: "100%",
            }}
          ></div>
          <div className="w-100 p-3">
            <div className="fs-5 text-primary">
              <span className="me-2">
                <i className="bi bi-geo-alt-fill"></i>
              </span>
              Địa chỉ nhận hàng
            </div>
            <div className="mt-3 ms-1">
              {defaultAddress ? (
                <>
                  <span className="fw-bold me-3">
                    {defaultAddress.name} {defaultAddress.phone}
                  </span>
                  <span className="me-3">
                    {defaultAddress.specific_address},{" "}
                    {defaultAddress.address.district.ward.prefix}{" "}
                    {defaultAddress.address.district.ward.name},{" "}
                    {defaultAddress.address.district.name},{" "}
                    {defaultAddress.address.name}
                  </span>
                  {defaultAddress.is_default && (
                    <span className="border border-primary p-1 text-primary me-3">
                      Mặc định
                    </span>
                  )}
                  <button
                    className="ms-3 text-primary"
                    onClick={handleShowSelectAddress}
                  >
                    Thay đổi
                  </button>
                </>
              ) : (
                <span className="text-muted">Chưa có địa chỉ mặc định</span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white w-100 mt-3">
          <div className="w-100 p-3">
            <table className="table table-borderless align-middle">
              <thead>
                <tr>
                  <th scope="col">
                    <h4>Sản phẩm</h4>
                  </th>
                  <th scope="col" className="text-end">
                    Đơn giá
                  </th>
                  <th scope="col" className="text-end">
                    Số lượng
                  </th>
                  <th scope="col" className="text-end">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="border-top">
                {listCheckout.products.map((product) => {
                  const price =
                    product.items.price * (1 - product.items.discount / 100);
                  const total = price * product.quantity;

                  return (
                    <tr key={product._id} className="border-bottom">
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={product.items.image.mediaFilePath}
                            alt={product.name}
                            className="rounded me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <div className="fw-bold">{product.name}</div>
                            <small className="text-muted">
                              {product.items.color.colorName} -{" "}
                              {product.items.variations.size.sizeName}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(price)}
                      </td>
                      <td className="text-end">{product.quantity}</td>
                      <td className="text-end">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-white w-100 mt-3">
            <div className="w-100 p-3">
              <h4>Phương thức giao hàng</h4>
              {selectedShippingMethod && (
                <>
                  <div className="d-flex w-50 justify-content-between align-items-center">
                    <div>
                      <div>{selectedShippingMethod.name}</div>
                      <small className="text-muted">
                        {selectedShippingMethod.description}
                      </small>
                    </div>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedShippingMethod.price)}
                    </span>
                    <button
                      className="text-primary"
                      onClick={handleShowSelectShippingMethods}
                    >
                      Thay đổi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-100 p-3 border-top">
            <div className="text-end">
              <span>
                Tổng số tiền ({listCheckout.products.length} sản phẩm) :
                <span className="ms-2 fs-5 text-danger">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalAmount)}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white w-100 mt-3">
          <div className="w-100 p-3">
            <h4>Phương thức thanh toán</h4>
            <div className="border-bottom py-2 d-flex justify-content-between align-items-center">
              <span>Thanh toán khi nhận hàng</span>
              <input type="radio" name="payment_method" defaultChecked />
            </div>
            <div className="bg-danger-subtle text-end p-3 d-flex">
              <div className="w-25">
                <span className="invisible">.</span>
              </div>
              <div className="w-75">
                <div className="w-50 float-end">
                  <div className="d-flex justify-content-between py-2">
                    <span className="me-2">Tổng Thành Tiền</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        listCheckout.products.reduce((total, product) => {
                          const price =
                            product.items.price *
                            (1 - product.items.discount / 100);
                          const totalProduct = price * product.quantity;
                          return total + totalProduct;
                        }, 0)
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span className="me-2">Tổng tiền phí vận chuyển</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedShippingMethod?.price)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span className="me-2">Tổng Thanh Toán</span>
                    <span className="text-primary fs-5">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end p-3">
              <button className="btn btn-primary" onClick={handleOrder}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
