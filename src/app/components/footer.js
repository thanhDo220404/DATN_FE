"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  if (isAdminPage) return null;

  return (
    <>
      <footer className="bg-main-color text-white">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3">
              <h5>Giới thiệu</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Giới thiệu về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Đội ngũ của chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Tầm nhìn và sứ mệnh
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h5>Thông tin liên hệ</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Email: contact@example.com
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Điện thoại: 0123-456-789
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Địa chỉ: 123 Đường ABC, Quận 1, HCM
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h5>Chuyên mục</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Sản Phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Flash Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Về Chúng Tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Hỗ Trợ
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <a href="/" className="d-block mb-3">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  style={{ height: "150px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center py-2" style={{ background: "#006B61" }}>
          Copyright by team Dreamers
        </div>
      </footer>
    </>
  );
}
