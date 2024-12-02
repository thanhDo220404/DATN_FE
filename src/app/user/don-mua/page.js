"use client";
import {
  createPaymentUrl,
  getOrdersByUserId,
  updateOrderStatus,
} from "@/app/databases/order";
import { parseJwt } from "@/app/databases/users";
import { getCookie } from "@/app/lib/CookieManager";
import { useEffect, useState } from "react";
import Link from "next/link"; // Đừng quên import Link
import { getOrderStatuses } from "@/app/databases/order_status";

export default function Purchure() {
  const [payload, setPayload] = useState(null);
  const [orders, setOrders] = useState([]);
  const [listOrderStatuses, setListOrderStatues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Mặc định chọn "Tất cả"

  const fetchOrders = async (userId, statusId = null) => {
    const result = await getOrdersByUserId(userId);

    // Lọc đơn hàng theo trạng thái nếu có
    const filteredOrders = statusId
      ? result.filter((order) => order.order_status._id === statusId)
      : result;
    setOrders(filteredOrders); // Cập nhật trạng thái đơn hàng
  };

  const fetchOrderStatues = async () => {
    const result = await getOrderStatuses();
    setListOrderStatues(result);
  };

  // Thêm hàm cancelOrder vào mã hiện tại
  const cancelOrder = async (orderId) => {
    // Giả sử bạn có một API để hủy đơn hàng bằng orderId
    await updateOrderStatus(orderId, "6724f9c943ad843da1d31150");
    fetchOrders(payload._id); // Tải lại danh sách đơn hàng sau khi hủy
  };

  const handlePayment = async (paymentData) => {
    try {
      await createPaymentUrl(paymentData);
    } catch (error) {
      console.error("Payment process failed:", error);
    }
  };

  // Hàm xử lý khi người dùng chọn trạng thái
  const handleOrderStatus = (statusId) => {
    setSelectedStatus(statusId); // Cập nhật trạng thái đã chọn
    fetchOrders(payload._id, statusId); // Lọc đơn hàng theo trạng thái đã chọn
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    fetchOrderStatues();
    if (token) {
      const result = parseJwt(token);
      setPayload(parseJwt(token));
      fetchOrders(result._id);
    }
  }, []);

  return (
    <>
      <div className="fs-5">
        <div className="position-relative">
          <div className="bg-white position-sticky top-0 shadow-sm">
            <div className="d-flex justify-content-between fs-6">
              {/* Tạo riêng div cho "Tất cả" */}
              <div
                className={`p-3 flex-shrink-0 ${
                  selectedStatus === null
                    ? "border-primary border-bottom border-3 "
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleOrderStatus(null)} // Khi bấm "Tất cả" thì hiển thị tất cả đơn hàng
              >
                Tất cả
              </div>

              {/* Hiển thị các trạng thái còn lại từ listOrderStatuses */}
              {listOrderStatuses.map((status, index) => (
                <div
                  key={index}
                  className={`p-3 flex-grow-1 text-center ${
                    selectedStatus === status._id
                      ? "border-bottom border-primary border-3"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOrderStatus(status._id)} // Xử lý khi bấm vào trạng thái
                >
                  {status.name}
                </div>
              ))}
            </div>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="bg-white mt-3 p-3" key={order._id}>
                <div className="text-end text-success fs-6">
                  <i className="bi bi-truck"></i> {order.order_status.name}
                </div>
                <table className="table align-middle">
                  <tbody>
                    {order.products.map((cartItem, index) => {
                      const price =
                        cartItem.items.price *
                        (1 - cartItem.items.discount / 100);

                      return (
                        <tr key={cartItem._id} className="border-bottom">
                          <td>
                            <Link href={`/san-pham/${cartItem._id}`}>
                              <div className="d-flex align-items-center">
                                <img
                                  src={cartItem.items.image.mediaFilePath}
                                  alt={cartItem.name}
                                  className="rounded me-3"
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="fs-6">
                                  <p className="mb-0 fw-bold">
                                    {cartItem.name}
                                  </p>
                                  <p className="mb-0">
                                    <small className="text-muted">
                                      {cartItem.items.color.colorName} -{" "}
                                      {cartItem.items.variations.size.sizeName}
                                    </small>
                                  </p>
                                  <p className="mb-0">
                                    <small className="text-muted">
                                      x {cartItem.quantity}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="text-end fs-6">
                            {cartItem.items.discount > 0 && (
                              <del className="me-2 text-secondary">
                                {cartItem.items.price.toLocaleString()} ₫
                              </del>
                            )}
                            {price.toLocaleString()} ₫
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="">
                  <div className="text-end">
                    <span>
                      Thành tiền :{" "}
                      <span className="fs-4 text-primary">
                        {order.order_total.toLocaleString()} ₫
                      </span>
                    </span>
                  </div>
                  {order.order_status._id === "6724f9c943ad843da1d3114c" ||
                  order.order_status._id === "6724f9c943ad843da1d3114d" ||
                  order.order_status._id === "673f4eb7e8698e7b4115b84c" ||
                  order.order_status._id === "673f4eb7e8698e7b4115b84d" ? (
                    <div className="text-end mt-3">
                      {order.order_status._id ===
                        "673f4eb7e8698e7b4115b84c" && (
                        <button
                          className="btn btn-success me-3"
                          onClick={() =>
                            handlePayment({
                              orderId: order._id,
                              amount: order.order_total,
                              bankCode: "",
                              language: "vn",
                            })
                          }
                        >
                          Thanh toán
                        </button>
                      )}
                      <button
                        className="btn btn-danger"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Hủy đơn
                      </button>
                    </div>
                  ) : order.order_status._id === "6724f9c943ad843da1d3114f" ? (
                    <div className="text-end mt-3">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleReview(order._id)} // Handle review function
                      >
                        Đánh giá
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <>
              <div
                className="bg-white mt-3 shadow-sm"
                style={{ height: "500px" }}
              >
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center">
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
                      alt="Chưa có đơn hàng"
                      width={"100px"}
                    />
                    <div className="fs-5">Chưa có đơn hàng</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
