"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn hiện tại chứa "admin"
  const isAdminPage = pathname.includes("/admin");

  // Ẩn footer nếu đang trong trang admin
  if (isAdminPage) return null;

  return (
    <>
      <footer className="footer-bg">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <h5>Giới thiệu</h5>
              <ul className="footer-nav">
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Giới thiệu về chúng tôi
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Đội ngũ của chúng tôi
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Tầm nhìn và sứ mệnh
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Thông tin liên hệ</h5>
              <ul className="footer-nav">
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Email: contact@example.com
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Điện thoại: 0123-456-789
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Địa chỉ: 123 Đường ABC, Quận 1, HCM
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Chuyên mục</h5>
              <ul className="footer-nav">
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Trang Chủ
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Sản Phẩm
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Flase Sale
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Về Chúng Tôi
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    Hỗ Trợ
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <a
                href="/"
                className="footer-logo d-flex align-items-center mb-3"
              >
                <img
                  src="/images/logo1x.png"
                  alt="Logo"
                  style={{ height: "200px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div
          className="w-100 text-center text-light"
          style={{ background: "#006B61" }}
        >
          Copyright by team Dreamers
        </div>
      </footer>
    </>
  );
}
