"use client";

import Rating from "react-rating-stars-component";
import { getUserById } from "../databases/users";
import { useEffect, useState } from "react";
import Pagination from "./pagination";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/img/user`;

export default function ProductReviews({ reviews }) {
  const [enhancedReviews, setEnhancedReviews] = useState([]);

  const totalReviews = reviews.length;

  // Khởi tạo từ 5 đến 1 với giá trị mặc định là 0
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => i + 1).reduce(
    (acc, rating) => {
      acc[rating] = 0;
      return acc;
    },
    {}
  );
  // Cập nhật từ reviews
  reviews.forEach((review) => {
    const roundedRating = Math.round(review.rating);
    ratingDistribution[roundedRating] =
      (ratingDistribution[roundedRating] || 0) + 1;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const updatedReviews = await Promise.all(
        reviews.map(async (review) => {
          const user = await getUserById(review.user._id);
          // Cập nhật trực tiếp vào review.user.name và review.user.image
          review.user.name = user.User.name;
          review.user.image = user.User.image
            ? `${API_URL}/${user.User.image}`
            : "";

          return review; // Trả về đối tượng review đã được cập nhật
        })
      );
      setEnhancedReviews(updatedReviews);
    };

    fetchUserData();
  }, [reviews]); // Lần đầu khi reviews thay đổi

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const paginatedReviews = enhancedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="row my-4 bg-white p-3">
      <div className="col-md-12">
        <h4 className="mb-3">Đánh giá sản phẩm</h4>
        <div className="border p-4">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="mb-0">{averageRating.toFixed(1)}/5</h1>
              <div className="text-warning fs-4">
                <Rating
                  count={5}
                  size={20}
                  edit={false}
                  isHalf={true}
                  value={averageRating || 0}
                  emptyIcon={<i className="bi bi-star"></i>}
                  halfIcon={<i className="bi bi-star-half"></i>}
                  filledIcon={<i className="bi bi-star-fill"></i>}
                />
              </div>
              <p>{totalReviews} đánh giá</p>
            </div>
            <div className="ms-4 flex-grow-1">
              {Object.keys(ratingDistribution)
                .reverse()
                .map((rating) => {
                  const percentage =
                    totalReviews > 0
                      ? (ratingDistribution[rating] / totalReviews) * 100
                      : 0;
                  return (
                    <div
                      key={rating}
                      className="d-flex align-items-center mb-2"
                    >
                      <span
                        className="me-2"
                        style={{ width: "30px", textAlign: "right" }}
                      >
                        {rating} ★
                      </span>
                      <div
                        className="progress flex-grow-1 mx-2"
                        style={{ height: "8px" }}
                      >
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: `${percentage}%` }}
                          aria-valuenow={percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span
                        className="ms-2"
                        style={{ width: "50px", textAlign: "left" }}
                      >
                        {ratingDistribution[rating]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {paginatedReviews.length <= 0 ? (
          <>
            <div style={{ height: "400px" }}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-center">
                  <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png"
                    alt="Chưa có đơn hàng"
                    width={"100px"}
                  />
                  <div className="fs-5">Chưa có đánh giá</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4">
              {paginatedReviews.map((review, index) => (
                <div key={index} className="d-flex mb-3">
                  <div className="me-3">
                    {review.user.image ? (
                      <img
                        className="rounded-circle"
                        src={review.user.image}
                        alt={review.user.image}
                        width={50}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {review.user.name
                          ? review.user.name.charAt(0)
                          : review.user._id.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="fs-6">
                      {review.user.name || review.user._id}
                    </div>
                    <Rating
                      count={5}
                      size={20}
                      edit={false}
                      value={review.rating}
                      emptyIcon={<i className="bi bi-star"></i>}
                      halfIcon={<i className="bi bi-star-half"></i>}
                      filledIcon={<i className="bi bi-star-fill"></i>}
                    />
                    <p className="mb-1 text-muted">
                      {new Date(review.createdAt).toLocaleTimeString("vi-VN")}{" "}
                      {new Date(review.createdAt).toLocaleDateString("vi-VN")} |
                      Phân loại hàng: {review.product.items.color.colorName},{" "}
                      {review.product.items.variations.size.sizeName}
                    </p>
                    <p className="mb-0">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </>
        )}
      </div>
    </div>
  );
}
