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
import Rating from "react-rating-stars-component";

export default function Purchure() {
  const [payload, setPayload] = useState(null);
  const [orders, setOrders] = useState([]);
  const [listOrderStatuses, setListOrderStatues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Mặc định chọn "Tất cả"
  const [currentReviewOrder, setCurrentReviewOrder] = useState(null);
  const [reviewData, setReviewData] = useState([]); // Để lưu dữ liệu review

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

  const handleReview = (orderData) => {
    setCurrentReviewOrder(orderData);

    // Khởi tạo mảng chứa các review cho từng sản phẩm
    const initialReviewData = orderData.products.map((product) => ({
      product: product, // Lưu ID sản phẩm
      rating: 1, // Đánh giá mặc định là 1
      comment: "", // Bình luận mặc định là rỗng
    }));

    setReviewData(initialReviewData);
    console.log(initialReviewData);
  };

  const submitReview = () => {
    console.log("Review Data:", reviewData);
    setCurrentReviewOrder(null); // Đóng modal
  };

  const handleRatingChange = (product, newRating) => {
    setReviewData((prev) =>
      prev.map((review) => {
        if (review.product._id === product._id) {
          // Kiểm tra nếu sản phẩm trùng khớp và cập nhật rating
          if (
            review.product.items._id === product.items._id &&
            review.product.items.variations._id === product.items.variations._id
          ) {
            return {
              ...review,
              rating: newRating, // Cập nhật rating cho sản phẩm
            };
          }
        }
        return review;
      })
    );
  };

  const handleCommentChange = (product, newComment) => {
    setReviewData((prev) =>
      prev.map((review) => {
        if (review.product._id === product._id) {
          // Kiểm tra nếu sản phẩm trùng khớp và cập nhật comment
          if (
            review.product.items._id === product.items._id &&
            review.product.items.variations._id === product.items.variations._id
          ) {
            return {
              ...review,
              comment: newComment, // Cập nhật comment cho sản phẩm
            };
          }
        }
        return review;
      })
    );
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
            orders.map((order, index) => (
              <div className="bg-white mt-3 p-3" key={index}>
                <div className="text-end text-success fs-6">
                  <i className="bi bi-truck"></i> {order.order_status.name}
                </div>
                <table className="table align-middle">
                  <tbody>
                    {order.products.map((product, index) => {
                      const price =
                        product.items.price *
                        (1 - product.items.discount / 100);

                      return (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Link href={`/san-pham/${product._id}`}>
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
                                <div className="fs-6">
                                  <p className="mb-0 fw-bold">{product.name}</p>
                                  <p className="mb-0">
                                    <small className="text-muted">
                                      {product.items.color.colorName} -{" "}
                                      {product.items.variations.size.sizeName}
                                    </small>
                                  </p>
                                  <p className="mb-0">
                                    <small className="text-muted">
                                      x {product.quantity}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="text-end fs-6">
                            {product.items.discount > 0 && (
                              <del className="me-2 text-secondary">
                                {product.items.price.toLocaleString()} ₫
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
                        data-bs-toggle="modal"
                        data-bs-target="#createReviewModal"
                        onClick={() => handleReview(order)} // Handle review function
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

      {/* Modal đánh giá */}
      <div
        className="modal fade"
        id="createReviewModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Đánh giá sản phẩm</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setCurrentReviewOrder(null)}
              ></button>
            </div>
            {currentReviewOrder ? (
              <div className="modal-body">
                {currentReviewOrder.products.map((product, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={product.items.image.mediaFilePath}
                        alt={product.name}
                        className="rounded me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: true,
                        }}
                      />
                      <div>
                        <p className="mb-0 fw-bold">{product.name}</p>
                        <small className="text-muted">
                          Phân loại sản phẩm : {product.items.color.colorName} -{" "}
                          {product.items.variations.size.sizeName}
                        </small>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 my-auto">Chất lượng sản phẩm</div>
                      <div className="col-6">
                        <Rating
                          count={5}
                          size={20}
                          value={reviewData[product]?.rating || 1}
                          emptyIcon={<i className="bi bi-star"></i>}
                          halfIcon={<i className="bi bi-star-half"></i>}
                          filledIcon={<i className="bi bi-star-fill"></i>}
                          onChange={(newRating) =>
                            handleRatingChange(product, newRating)
                          }
                        />
                      </div>
                    </div>
                    <textarea
                      className="form-control mt-2"
                      placeholder="Viết đánh giá của bạn..."
                      // value={reviewData[product]?.comment || ""}
                      onChange={(e) =>
                        handleCommentChange(product, e.target.value)
                      }
                    ></textarea>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">Không có dữ liệu đánh giá</div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setCurrentReviewOrder(null)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitReview}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
