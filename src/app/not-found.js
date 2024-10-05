"use client"; // Khai báo để Next.js biết đây là component phía client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [countdown, setCountdown] = useState(10); // Đếm ngược từ 10 giây
  const router = useRouter();

  // Tự động điều hướng về trang chủ sau khi kết thúc đếm ngược
  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Dọn dẹp bộ đếm thời gian khi component unmount hoặc countdown thay đổi
    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Oops! Trang bạn tìm kiếm không tồn tại</h2>
        <p className="lead mb-4">
          Có vẻ như trang bạn đang tìm kiếm đã bị xóa hoặc chưa từng tồn tại.
        </p>
        <p className="text-warning mb-4">
          Bạn sẽ được điều hướng về trang chủ trong <strong>{countdown}</strong>{" "}
          giây.
        </p>
        <Link href="/" passHref>
          <button className="btn btn-primary btn-lg">
            Quay lại Trang chủ ngay
          </button>
        </Link>
      </div>
    </div>
  );
}
