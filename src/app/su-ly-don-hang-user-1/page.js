import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

export default function sulydonhang1() {
  return (
    <>
      <div className="container">
        {/* Mã Đơn Hàng và Trạng Thái */}
        <div className="text-right mt-4">
          <h5>ID Đơn Hàng: 200915SM17E7MB</h5>
          <span className="text-danger">CHỜ LẤY HÀNG</span>
        </div>

        {/* Trạng Thái Đơn Hàng */}
        <div className="order-status position-relative d-flex justify-content-between mt-4">
          {/* Trạng thái "Đơn Hàng Đã Đặt" (hoàn thành) */}
          <div className="text-center">
            <div className="status-circle bg-success text-white d-flex justify-content-center align-items-center">
              <i className="bi bi-bag-check"></i>
            </div>
            <p className="status-text">Đơn Hàng Đã Đặt</p>
            <small>21:46 15-09-2020</small>
          </div>

          {/* Trạng thái "Xác Nhận Thanh Toán" (hoàn thành) */}
          <div className="text-center">
            <div className="status-circle bg-success text-white d-flex justify-content-center align-items-center">
              <i className="bi bi-cash"></i>
            </div>
            <p className="status-text">Xác Nhận Thanh Toán</p>
            <small>22:16 15-09-2020</small>
          </div>

          {/* Trạng thái "Đã Giao Cho DVVC" (hoàn thành) */}
          <div className="text-center">
            <div className="status-circle bg-success text-white d-flex justify-content-center align-items-center">
              <i className="bi bi-truck"></i>
            </div>
            <p className="status-text">Đã Giao Cho DVVC</p>
            <small>16:43 16-09-2020</small>
          </div>

          {/* Trạng thái "Đơn Hàng Đã Nhận" (chưa hoàn thành) */}
          <div className="text-center">
            <div className="status-circle bg-secondary text-white d-flex justify-content-center align-items-center">
              <i className="bi bi-box"></i>
            </div>
            <p className="status-text">Đơn Hàng Đã Nhận</p>
            <small>07:14 22-09-2020</small>
          </div>

          {/* Trạng thái "Đánh Giá" (chưa hoàn thành) */}
          <div className="text-center">
            <div className="status-circle bg-secondary text-white d-flex justify-content-center align-items-center">
              {" "}
              {/* chưa hoàn thành */}
              <i className="bi bi-star"></i>
            </div>
            <p className="status-text">Đánh Giá</p>
          </div>
        </div>

        {/* Nút Hành Động */}
        <div className="btn-section mt-4 d-flex justify-content-around">
          <button className="btn btn-danger">HỦY ĐƠN HÀNG</button>
          <button className="btn btn-warning">LIÊN HỆ NGƯỜI BÁN</button>
        </div>

        {/* Ghi Chú */}
        <div className="mt-4">
          <p className="text-center text-muted">
            Đơn hàng này chưa hoàn thành.
            <br />
            {/* <a href="#" className="text-success">
              Đánh giá ngay và nhận 100 Xu
            </a> */}
          </p>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
