"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { eraseCookie, getCookie } from "../lib/CookieManager";
import { parseJwt } from "../databases/users";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  // Nếu là trang admin, không render header
  if (isAdminPage) return null;
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //đăng xuất
  const handleLogout = () => {
    eraseCookie("LOGIN_INFO");
    setUserLoginInfo("");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      const payload = parseJwt(token);
      setUserLoginInfo(payload);
      setIsLoggedIn(true); // Cập nhật trạng thái đã đăng nhập
      if (payload.role === 1) {
        setIsAdmin(true);
      }
    } else {
      setUserLoginInfo({});
      setIsLoggedIn(false);
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
              {isLoggedIn ? (
                <div className="dropdown">
                  <Link
                    className="nav-link "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userLoginInfo ? (
                      <img
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                        src={`${apiUrl}/img/${userLoginInfo.image}`}
                        alt=""
                      />
                    ) : (
                      <FaUser className="nav-icon text-light fs-5 me-3" />
                    )}
                  </Link>
                  <ul
                    className="dropdown-menu"
                    style={{
                      position: "absolute",
                      inset: "0px 0px auto auto",
                      margin: "0px",
                      transform: "translate3d(0px, 34.4px, 0px)",
                    }}
                  >
                    {isAdmin && (
                      <li>
                        <Link className="dropdown-item" href="/admin">
                          Quản lý website
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/user/tai-khoan/ho-so"
                      >
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/user/don-hang">
                        Đơn hàng
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/buyer/dang-nhap">
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
