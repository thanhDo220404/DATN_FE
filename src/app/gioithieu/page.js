import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

export default function gioithieu() {
  return (
    <>
      <div className="container mt-4">
        {/* Đường dẫn Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Giới thiệu
            </li>
          </ol>
        </nav>
        {/* Phần tiêu đề */}
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>VỀ CHÚNG TÔI</h2>
            <p>
              Dự án Dreamers - Building online store for men's fashion được thực
              hiện với mục tiêu xây dựng một website bán hàng chuyên nghiệp, tập
              trung vào thời trang nam. Trong thời đại công nghệ hiện nay, việc
              sở hữu một trang web không chỉ giúp các cửa hàng tiếp cận được
              nhiều khách hàng hơn mà còn tối ưu hóa quy trình bán hàng, quản lý
              hàng hóa và đơn hàng hiệu quả. Nhóm Dreamers hướng đến việc tạo ra
              một trang web có giao diện hiện đại, dễ sử dụng, với trải nghiệm
              người dùng thân thiện và trực quan. Website sẽ hiển thị sản phẩm
              một cách sinh động và rõ ràng, giúp khách hàng dễ dàng tìm kiếm và
              mua sắm các sản phẩm thời trang nam phù hợp. Hơn nữa, hệ thống còn
              tích hợp các tính năng quản lý kho hàng và xử lý đơn hàng, hỗ trợ
              người quản lý cửa hàng kiểm soát hiệu quả các hoạt động kinh
              doanh. Dự án không chỉ dừng lại ở việc xây dựng một cửa hàng trực
              tuyến mà còn hướng tới việc tạo ra một giải pháp toàn diện cho
              doanh nghiệp, giúp nâng cao hiệu quả vận hành và đem lại sự hài
              lòng cho khách hàng.
            </p>
          </div>
        </div>
        {/* Phần nội dung */}
        <div className="row mt-4">
          {/* Google Maps */}
          <div className="col-md-6">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096176!2d144.96305771531667!3d-37.81627977975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577da3f9daef738!2sGoogle%20Australia!5e0!3m2!1svi!2sau!4v1613792231097!5m2!1svi!2sau"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          {/* Thông tin chi nhánh */}
          <div className="col-md-5">
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh1.jpg"
                className="img-fluid"
                alt="Chi nhánh 01"
              />
              <p>
                Chi nhánh 01
                <br />
                Địa chỉ: 123 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh2.jpg"
                className="img-fluid"
                alt="Chi nhánh 02"
              />
              <p>
                Chi nhánh 02
                <br />
                Địa chỉ: 125 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh3.jpg"
                className="img-fluid"
                alt="Chi nhánh 03"
              />
              <p>
                Chi nhánh 03
                <br />
                Địa chỉ: 130 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh4.jpg"
                className="img-fluid"
                alt="Chi nhánh 04"
              />
              <p>
                Chi nhánh 04
                <br />
                Địa chỉ: 140 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap JS */}
      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
