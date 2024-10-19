"use client";
import { parseJwt } from "@/app/databases/users";
import { getCookie } from "@/app/lib/CookieManager";
import Link from "next/link";
import { useEffect } from "react";

export default function Menu() {
  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      const payload = parseJwt(token);
      if (payload.role !== 1) {
        window.location.replace("/");
      }
    } else {
      window.location.replace("/buyer/dang-nhap");
    }
  }, []);
  return (
    <>
      {/* <div className="d-flex flex-column flex-shrink-0 p-3 bg-white vh-100">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </a>
        <hr></hr>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <Link href="/admin/media" className="nav-link link-body-emphasis">
              Media
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link link-body-emphasis">
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-body-emphasis">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-body-emphasis">
              Customers
            </a>
          </li>
        </ul>
        <hr></hr>
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            ></img>
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div> */}
      {/* thanh nav */}
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="/images/hay.jpg"
            width="50px"
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>Võ Trường</b>
            </p>
            <p className="app-sidebar__user-designation">
              Chào mừng bạn trở lại
            </p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
          <li>
            <Link className="app-menu__item active" href="/admin">
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item active" href="/admin/media">
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">Media</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="/admin/users">
              <i className="bi bi-person" />
              <span className="app-menu__label">Quản lý người dùng</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="/admin/danh-muc">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý danh mục</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="/admin/san-pham">
              <i className="bi bi-tag" />
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="/admin/don-hang">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </Link>
          </li>
          {/* <li>
            <a className="app-menu__item" href="table-data-money.html">
              <i className="bi bi-currency-dollar" />
              <span className="app-menu__label">Quản lý kho hàng</span>
            </a>
          </li> */}
          <li>
            <Link className="app-menu__item" href="/admin/bao-cao">
              <i className="bi bi-bar-chart-line" />
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </Link>
          </li>
          <li>
            <a className="app-menu__item" href="#">
              <i className="bi bi-gear" />
              <span className="app-menu__label">Cài đặt hệ thống</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
