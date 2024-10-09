"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCookie } from "../lib/CookieManager";

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  // Nếu là trang admin, không render header
  if (isAdminPage) return null;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <header className="menu-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          {/* Icons cho mobile */}
          <div className="nav-icons d-flex d-lg-none align-items-center">
            <Link href="/dang-nhap">
              <FaUser className="nav-icon text-light fs-5 me-3" />
            </Link>
            <Link href="/gio-hang">
              <FaShoppingCart className="nav-icon text-light fs-5" />
            </Link>
          </div>

          {/* Logo */}
          <Link className="navbar-brand" href="/">
            <img
              src="/images/logo1x.png"
              alt="Logo"
              style={{ width: "70px", height: "70px" }}
            />
          </Link>

          {/* Toggler cho mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sản phẩm
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      ÁO THUN - T SHIRT
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      QUẦN - PANTS
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      ÁO KHOÁC - HOODIE
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      PHỤ KIỆN - ACCESSORY
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex" href="#">
                  Flash Sale
                  <img
                    src="/images/fireFlashSale.png"
                    width="20px"
                    alt="Flash Sale"
                  />
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Về chúng tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Hỗ trợ
                </Link>
              </li>
            </ul>

            {/* Form tìm kiếm */}
            <form className="d-flex me-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                <FaSearch />
              </button>
            </form>

            {/* Icons cho desktop */}
            <div className="nav-icons d-none d-lg-flex align-items-center">
              {isUserLoggedIn ? (
                <div className="dropdown">
                  <Link
                    className="nav-link "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="nav-icon text-light fs-5 me-3" />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/user/tai-khoan">
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/user/don-hang">
                        Đơn hàng
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/user/dang-nhap">
                  <FaUser className="nav-icon text-light fs-5 me-3" />
                </Link>
              )}
              <Link href="/gio-hang">
                <FaShoppingCart className="nav-icon text-light fs-5" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
