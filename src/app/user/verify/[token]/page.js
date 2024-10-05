"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link từ Next.js

export default function VerifyToken({ params }) {
  const { token } = params; // Lấy token từ params
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/verify/${token}`
        );
        const result = await response.json();

        if (response.ok) {
          setMessage(result.message); // Thông báo thành công
        } else {
          setError(result.message || "Xác nhận email thất bại.");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi xác thực token.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-25 m-auto py-5">
      <div className="text-center">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang xác thực...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger fs-5">{error}</div>
        ) : (
          <div className="alert alert-success fs-5">{message}</div>
        )}
      </div>
      <div className="text-center mt-4">
        <Link href="/dang-nhap" className="btn btn-primary">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}
