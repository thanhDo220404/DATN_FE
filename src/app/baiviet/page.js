import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

export default function baiviet() {
  return (
    <>
      <div className="container mt-4">
        {/* Bài viết chính */}
        <div className="row">
          {/* Phần bài viết chính */}
          <div className="col-lg-8 main-article">
            <h1>Xu Hướng Thời Trang 2024: Phong Cách Tối Giản Lên Ngôi</h1>
            <p>
              <strong>Ngày đăng:</strong> 23/10/2024 | <strong>Tác giả:</strong>{" "}
              Thời Trang Plus
            </p>
            <img
              src="../img-gioithieu/bv1.png"
              alt="Xu hướng thời trang 2024"
            />
            <p className="mt-3">
              Năm 2024 hứa hẹn mang đến những xu hướng thời trang tối giản, với
              các thiết kế nhẹ nhàng và thanh lịch. Các màu sắc trung tính như
              trắng, đen, be sẽ chiếm ưu thế, tạo nên vẻ ngoài tinh tế và hiện
              đại...
            </p>
          </div>
          {/* Phần bài viết liên quan */}
          <div className="col-lg-4">
            <h4>Bài viết liên quan</h4>
            <div className="related-articles">
              <div className="d-flex mb-3">
                <img
                  src="../img-gioithieu/bv2.jpg"
                  alt="Bài viết liên quan 1"
                  className="me-2"
                />
                <div>
                  <p className="article-title">
                    Bí quyết mặc đẹp cho mùa thu đông 2024
                  </p>
                  <p>2 giờ trước | Thời Trang 24h</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <img
                  src="../img-gioithieu/bv3.jpg"
                  alt="Bài viết liên quan 2"
                  className="me-2"
                />
                <div>
                  <p className="article-title">
                    Những mẫu không thể thiếu trong tủ đồ năm 2024
                  </p>
                  <p>3 giờ trước | Thế Giới quần áo</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <img
                  src="../img-gioithieu/bv4.jpg"
                  alt="Bài viết liên quan 3"
                  className="me-2"
                />
                <div>
                  <p className="article-title">
                    Phong cách thời trang đường phố: Sự trỗi dậy mạnh mẽ
                  </p>
                  <p>4 giờ trước | Street Style VN</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <img
                  src="../img-gioithieu/bv5.jpg"
                  alt="Bài viết liên quan 4"
                  className="me-2"
                />
                <div>
                  <p className="article-title">
                    Tông màu pastel dẫn đầu xu hướng thời trang 2024
                  </p>
                  <p>5 giờ trước | Pastel Trends</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <img
                  src="../img-gioithieu/bv6.jpg"
                  alt="Bài viết liên quan 2"
                  className="me-2"
                />
                <div>
                  <p className="article-title">
                    Những mẫu quần áo thu đông không thể thiếu năm 2024
                  </p>
                  <p>7 giờ trước | Thế Giới quần áo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Thêm phần bài viết khác (nếu cần) */}
        <div className="row mt-5">
          <h4>Thêm tin tức thời trang</h4>
          <div className="col-lg-4">
            <div className="card">
              <img
                src="../img-gioithieu/bv4.png"
                className="card-img-top"
                alt="Thời trang đường phố"
              />
              <div className="card-body">
                <h5 className="card-title">Mẫu thiết kế của Fendi – Todd Snyder – Ziggy Chen</h5>
                <p className="card-text">
                  Khám phá những xu hướng thời trang đường phố nổi bật nhất năm
                  2024...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img
                src="../img-gioithieu/bv3.png"
                className="card-img-top"
                alt="Thời trang công sở"
              />
              <div className="card-body">
                <h5 className="card-title">Mẫu thiết kế của Louis Vuitton – Valentino – Wooyoungmi</h5>
                <p className="card-text">
                  Bộ sưu tập thời trang công sở thanh lịch và hiện đại...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img
                src="../img-gioithieu/bv2.png"
                className="card-img-top"
                alt="Phong cách tối giản"
              />
              <div className="card-body">
                <h5 className="card-title">Mẫu thiết kế của Ami Paris – Giorgio Armani – Saint Lauren</h5>
                <p className="card-text">
                  Phong cách thời trang tối giản là xu hướng được yêu thích
                  trong năm 2024...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
