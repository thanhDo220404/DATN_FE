"use client";
import { usePathname } from "next/navigation";

export default function Container({ children }) {
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn hiện tại chứa "admin"
  const isAdminPage = pathname.includes("/admin");

  // Ẩn `Menu` nếu đang trong trang admin
  if (isAdminPage) return children;
  return <div className="container">{children}</div>;
}
