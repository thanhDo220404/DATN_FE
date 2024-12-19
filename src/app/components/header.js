"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { eraseCookie, getCookie } from "../lib/CookieManager";
import { parseJwt } from "../databases/users";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserId } from "../../../redux/slices/cartSlice";
import { getAllCategories } from "../databases/categories";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname.includes("/admin");
  const [categories, setCategories] = useState([]);

  if (isAdminPage) return null;

  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // State lưu từ khóa tìm kiếm

  // Lấy giỏ hàng từ Redux store
  const carts = useSelector((state) => state.cart.items); // lấy từ cartSlice
  const totalItems = carts.length; // tính tổng số lượng từ items trong giỏ hàng

  // Đăng xuất
  const handleLogout = () => {
    eraseCookie("LOGIN_INFO");
    setUserLoginInfo("");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const fetchCategories = async () => {
    const result = await getAllCategories();
    setCategories(result);
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    fetchCategories();
    if (token) {
      const payload = parseJwt(token);
      setUserLoginInfo(payload);
      setIsLoggedIn(true);
      dispatch(fetchCartByUserId(payload._id)); // Dispatch action to fetch cart
      if (payload.role === 1) {
        setIsAdmin(true);
      }
    } else {
      setUserLoginInfo({});
      setIsLoggedIn(false);
    }
  }, []);

  // Xử lý sự kiện tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(`/tim-kiem?keywords=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword(""); // Xóa chữ trong ô input sau khi tìm kiếm
    }
  };

  return (
    <header className="menu-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          {/* Icons cho mobile */}
          <div className="nav-icons d-flex d-lg-none align-items-center">
            {isLoggedIn ? (
              <div className="dropdown">
                <Link
                  className="nav-link"
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
                      src={`${apiUrl}/img/user/${userLoginInfo.image}`}
                      alt=""
                    />
                  ) : (
                    <FaUser className="nav-icon text-light fs-5 me-3" />
                  )}
                </Link>
                <ul className="dropdown-menu">
                  {isAdmin && (
                    <li>
                      <a className="dropdown-item" href="/admin">
                        Quản lý website
                      </a>
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
                    <Link className="dropdown-item" href="/user/don-mua">
                      Đơn mua
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
              <Link href={`/buyer/dang-nhap?next=${pathname}`}>
                <FaUser className="nav-icon text-light fs-5 me-3" />
              </Link>
            )}
            <Link href="/gio-hang" className="position-relative">
              <FaShoppingCart className="nav-icon text-light fs-3" />
              <div className="position-absolute top-0 start-100 translate-middle badge border rounded-circle bg-danger px-2 py-1">
                <span style={{ fontSize: "12px" }}>{totalItems}</span>
              </div>
            </Link>
          </div>

          {/* Logo */}
          <Link className="navbar-brand" href="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: "150px", height: "70px" }}
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
              <li className="nav-item">
                <Link className="nav-link" href="/san-pham">
                  Sản phẩm
                </Link>
              </li>
              <div className="dropdown">
                <Link
                  className="nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục
                  <i className="bi bi-caret-down-fill"></i>
                </Link>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        className="dropdown-item"
                        href={`/danh-muc/${category._id}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <li className="nav-item">
                <Link className="nav-link" href="/bai-viet">
                  Bài viết
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/ve-chung-toi">
                  Về chúng tôi
                </Link>
              </li>
            </ul>

            {/* Form tìm kiếm */}
            <form className="d-flex me-2" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
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
                    className="nav-link"
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
                        src={`${apiUrl}/img/user/${userLoginInfo.image}`}
                        alt=""
                      />
                    ) : (
                      <FaUser className="nav-icon text-light fs-5 me-3" />
                    )}
                  </Link>
                  <ul className="dropdown-menu">
                    {isAdmin && (
                      <li>
                        <a className="dropdown-item" href="/admin">
                          Quản lý website
                        </a>
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
                      <Link className="dropdown-item" href="/user/don-mua">
                        Đơn mua
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href={`/buyer/dang-nhap?next=${pathname}`}>
                  <FaUser className="nav-icon text-light fs-5 me-3" />
                </Link>
              )}
              <Link href="/gio-hang" className="position-relative">
                <FaShoppingCart className="nav-icon text-light fs-3" />
                <div className="position-absolute top-0 start-100 translate-middle badge border rounded-circle bg-danger px-2 py-1">
                  <span style={{ fontSize: "12px" }}>{totalItems}</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
