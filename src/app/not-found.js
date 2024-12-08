"use client"; // Khai báo để Next.js biết đây là component phía client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Oops! Trang bạn tìm kiếm không tồn tại</h2>
        <p className="lead mb-4">
          Có vẻ như trang bạn đang tìm kiếm đã bị xóa hoặc chưa từng tồn tại.
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
