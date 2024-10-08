import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

export default function chitiet() {
  return (
    <>
      {/* Khởi tạo phần container chính */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {/* Phần hình ảnh sản phẩm chính */}
            <div className="product-image">
              <img
                alt="Product Image"
                className="img-fluid" // Đảm bảo hình ảnh đáp ứng với kích thước của cột.
                id="main-image" // ID để dễ dàng tham chiếu đến hình ảnh chính.
                src="./images/sp2.jpg" // Đường dẫn đến hình ảnh sản phẩm.
              />
            </div>
            {/* Phần hình ảnh thu nhỏ */}
            <div className="thumbnail-images">
              {/* Các hình ảnh thu nhỏ, khi nhấn sẽ đổi hình ảnh chính */}
              <img
                alt="Thumbnail 1"
                onClick="changeImage(this)" // Gọi hàm changeImage khi hình ảnh này được nhấn.
                src="./images/sp2.jpg"
              />
              <img
                alt="Thumbnail 2"
                onClick="changeImage(this)"
                src="./images/sp3.jpg"
              />
              <img
                alt="Thumbnail 3"
                onClick="changeImage(this)"
                src="./images/sp4.jpg"
              />
              <img
                alt="Thumbnail 4"
                onClick="changeImage(this)"
                src="./images/sp4.jpg"
              />
              <img
                alt="Thumbnail 5"
                onClick="changeImage(this)"
                src="./images/sp5.jpg"
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* Thông tin sản phẩm */}
            <h3>
              Áo Thun Local Brand 8YO Unisex Nam Nữ Form Rộng Checkmate Tee Áo
              Polo Oversize
            </h3>
            <p>
              <strong>99 Vote</strong> · <span>1,2k Đã bán</span>
            </p>
            {/* Hiển thị giá sản phẩm */}
            <div className="price">
              399.000đ <span className="old-price">489.000đ</span>
            </div>
            {/* Các tùy chọn của sản phẩm */}
            <div className="product-options">
              {/* Màu sắc */}
              <div className="mb-3">
                <label htmlFor="color-options">Màu sắc:</label>
                <div id="color-options">
                  <button className="btn btn-outline-secondary">Kem</button>
                  <button className="btn btn-outline-secondary">Đen</button>
                  <button className="btn btn-outline-secondary">Trắng</button>
                  <button className="btn btn-outline-secondary">Teal</button>
                </div>
              </div>
              {/* Kích thước */}
              <div className="mb-3">
                <label htmlFor="size-options">Kích thước:</label>
                <div id="size-options">
                  <button className="btn btn-outline-secondary">
                    M: 40-60kg
                  </button>
                  <button className="btn btn-outline-secondary">
                    L: 60-80kg
                  </button>
                  <button className="btn btn-outline-secondary">
                    XL: 70-90kg
                  </button>
                </div>
              </div>
              {/* Vận chuyển */}
              <div className="mb-3">
                <label htmlFor="shipping-options">Vận chuyển:</label>
                <div id="shipping-options">
                  <button className="btn btn-outline-success">
                    Miễn phí vận chuyển
                  </button>
                </div>
              </div>
              {/* Số lượng */}
              <div className="mb-3">
                <label htmlFor="quantity">Số lượng:</label>
                <div
                  className="input-group"
                  style={{
                    width: "100px",
                  }}
                >
                  <button className="btn btn-outline-secondary" type="button">
                    - {/* Nút giảm số lượng */}
                  </button>
                  <input
                    className="form-control text-center" // Định dạng input để hiển thị số lượng.
                    defaultValue="1" // Giá trị mặc định là 1.
                    type="text"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    + {/* Nút tăng số lượng */}
                  </button>
                </div>
              </div>
            </div>
            {/* Nút mua ngay và thêm vào giỏ hàng */}
            <button className="btn btn-warning btn-lg btn-custom">
              MUA NGAY
            </button>
            <button className="btn btn-outline-secondary btn-lg btn-custom">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Phần chi tiết sản phẩm */}
        <div className="details-section row mt-4">
          <div className="col-md-6">
            <h5>DETAILS</h5>
            <p>
              <strong>Xuất xứ:</strong> Việt Nam {/* Xuất xứ sản phẩm */}
            </p>
            <p>
              <strong>Chất liệu:</strong> Premium Cotton 2C dày dặn, đứng form{" "}
              {/* Chất liệu sản phẩm */}
            </p>
            <p>
              <strong>Dáng áo:</strong> Oversized {/* Dáng áo */}
            </p>
            <p>
              <strong>Cổ áo:</strong> Cổ tròn {/* Kiểu cổ áo */}
            </p>
            <p>
              <strong>Gửi từ:</strong> Quận Thanh Xuân, Hà Nội{" "}
              {/* Địa điểm gửi hàng */}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Bảo hành:</strong> Mỗi khi giặt nhớ lộn phải áo để không
              làm hình in bị ảnh hưởng và không giặt máy.{" "}
              {/* Thông tin bảo hành */}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vestibulum dui sit amet orci ornare, nec cursus turpis tristique.
              Phasellus convallis erat at nulla tristique, in aliquet massa
              varius. {/* Mô tả thêm về sản phẩm */}
            </p>
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="feedback-section">
          <h3>ACTUAL PICTURES</h3>
          <div className="feedback-images">
            {/* Hình ảnh thực tế */}
            <img alt="Feedback 1" src="./images/sp9.jpg" />
            <img alt="Feedback 2" src="./images/sp8.jpg" />
            <img alt="Feedback 3" src="./images/sp7.jpg" />
            <img alt="Feedback 4" src="./images/sp6.jpg" />
            <img alt="Feedback 5" src="./images/sp5.jpg" />
            <img alt="Feedback 6" src="./images/sp4.jpg" />
          </div>
        </div>

        {/* Phần sản phẩm gợi ý */}
        <div className="container mt-5">
          <h3 className="product-title">Có Thể Bạn Sẽ Thích</h3>
          <div className="row featured-products">
            {Array(8) // Tạo 8 sản phẩm gợi ý
              .fill(null)
              .map((_, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card">
                    <img
                      alt={`Best Seller Product ${index + 1}`} // Hình ảnh sản phẩm gợi ý
                      className="card-img-top"
                      src={`/images/sp${index + 1}.jpg`} // Đường dẫn hình ảnh cho sản phẩm
                    />
                    <div className="card-body">
                      <h5 className="card-title">D22-T6 Tee Riot Devil</h5>
                      <p className="card-text">
                        199.000đ <del>299.000đ</del> {/* Giá sản phẩm */}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-warning">MUA NGAY</button>
                        <button className="btn btn-outline-secondary">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* tổng đánh giá */}
        <div className="rating-section">
          <h3>Đánh giá sản phẩm</h3>
          <div className="rating-summary">
            <div className="average-rating">
              <h4>4.9/5</h4>
              <p>500 đánh giá</p>
            </div>
            <div className="rating-bars">
              <div className="rating-bar">
                <span>5 ★</span>
                <div className="progress-bar">
                  <div
                    className="filled"
                    style={{
                      width: "90%",
                    }}
                  />
                </div>
                <span>450</span>
              </div>
              <div className="rating-bar">
                <span>4 ★</span>
                <div className="progress-bar">
                  <div
                    className="filled"
                    style={{
                      width: "10%",
                    }}
                  />
                </div>
                <span>50</span>
              </div>
              <div className="rating-bar">
                <span>3 ★</span>
                <div className="progress-bar">
                  <div
                    className="filled"
                    style={{
                      width: "0%",
                    }}
                  />
                </div>
                <span>0</span>
              </div>
              <div className="rating-bar">
                <span>2 ★</span>
                <div className="progress-bar">
                  <div
                    className="filled"
                    style={{
                      width: "0%",
                    }}
                  />
                </div>
                <span>0</span>
              </div>
              <div className="rating-bar">
                <span>1 ★</span>
                <div className="progress-bar">
                  <div
                    className="filled"
                    style={{
                      width: "0%",
                    }}
                  />
                </div>
                <span>0</span>
              </div>
            </div>
            <button className="btn-rate">Đánh giá</button>
          </div>
        </div>

        {/* đánh giá từ người dùng */}
        <div className="customer-reviews">
          <div className="review">
            <span className="initials">H</span>
            <div className="review-content">
              <h5>Hạnh</h5>
              <p>Đẹp lắm!</p>
              <div className="rating-stars">★★★★★</div>
            </div>
          </div>
          <div className="review">
            <span className="initials">N</span>
            <div className="review-content">
              <h5>Nhung</h5>
              <p>Áo chất mát mẻ</p>
              <div className="rating-stars">★★★★</div>
            </div>
          </div>
          <div className="review">
            <span className="initials">K</span>
            <div className="review-content">
              <h5>Kim</h5>
              <p>Shop thân thiện. Sẽ quay lại.</p>
              <div className="rating-stars">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
