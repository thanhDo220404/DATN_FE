"use client";
import { parseJwt } from "@/app/databases/users";
import { getCookie } from "@/app/lib/CookieManager";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

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
            <Link
              className={`app-menu__item ${
                pathname === "/admin" ? "active" : ""
              }`}
              href="/admin"
            >
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/media" ? "active" : ""
              }`}
              href="/admin/media"
            >
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">Media</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/users" ? "active" : ""
              }`}
              href="/admin/users"
            >
              <i className="bi bi-person" />
              <span className="app-menu__label">Quản lý người dùng</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/danh-muc" ? "active" : ""
              }`}
              href="/admin/danh-muc"
            >
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý danh mục</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/san-pham" ? "active" : ""
              }`}
              href="/admin/san-pham"
            >
              <i className="bi bi-tag" />
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/don-hang" ? "active" : ""
              }`}
              href="/admin/don-hang"
            >
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${
                pathname === "/admin/bao-cao" ? "active" : ""
              }`}
              href="/admin/bao-cao"
            >
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
