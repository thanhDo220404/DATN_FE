"use client";
import { hasCookie } from "@/app/lib/CookieManager";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasCookie("LOGIN_INFO")) {
      router.push("/buyer/dang-nhap");
    }
    // Nếu path bắt đầu bằng "/user/tai-khoan", thì mở menu con
    if (pathname && pathname.startsWith("/user/tai-khoan")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    <ul className="list-group container">
      <li className="list-group-item" id="accountSubmenu">
        <div className="accordion-item">
          <div className="accordion-header">
            <div
              className="accordion-button position-relative"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls="collapseThree"
            >
              <Link
                className="position-absolute w-100 h-100"
                href="/user/tai-khoan/ho-so"
              ></Link>
              Tài Khoản Của Tôi
            </div>
          </div>
          <div
            id="collapseThree"
            className={`accordion-collapse collapse ${isOpen ? "show" : ""}`} // Thêm class "show" nếu isOpen = true
            data-bs-parent="#accountSubmenu"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <Link href="/user/tai-khoan/ho-so">Hồ Sơ</Link>
                </li>
                <li>
                  <Link href="/user/tai-khoan/dia-chi">Địa Chỉ</Link>
                </li>
                <li>
                  <Link href="/user/tai-khoan/doi-mat-khau">Đổi Mật Khẩu</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <Link href="/user/don-mua">Đơn Mua</Link>
      </li>
    </ul>
  );
}
