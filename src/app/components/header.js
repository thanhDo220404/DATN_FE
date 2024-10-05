"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md"; // Import icon mũi tên xuống

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  if (isAdminPage) return null;

  return (
    <>
      <header className="menu-header">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <a className="navbar-brand" href="#">
                <img
                  src="./images/logo1x.png"
                  alt="Logo"
                  style={{ width: "70px", height: "70px" }}
                />
              </a>
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
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Trang chủ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={toggleSubMenu} // Toggle menu con khi nhấn vào
                    >
                      Sản phẩm <MdArrowDropDown className="dropdown-icon" /> {/* Thêm icon mũi tên */}
                    </a>
                    
                    {showSubMenu && (
                      <ul className="sub-menu">
                        <li><a href="#">ÁO THUN - T SHIRT</a></li>
                        <li><a href="#">QUẦN - PANTS</a></li>
                        <li><a href="#">ÁO KHOÁC - HOODIE</a></li>
                        <li><a href="#">PHỤ KIỆN - ACCESSORY</a></li>
                      </ul>
                    )}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Flash Sale
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Về chúng tôi
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Hỗ trợ
                    </a>
                  </li>
                </ul>
                
                <form className="d-flex search-form" role="search">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-light search-btn" type="submit">
                    <FaSearch />
                  </button>
                </form>
                <div className="nav-icons d-flex align-items-center">
                  <FaUser className="nav-icon" />
                  <FaShoppingCart className="nav-icon" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
