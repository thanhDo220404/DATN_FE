"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Overlay from "../../components/overlay";
import { getCookie } from "@/app/lib/CookieManager";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Alert = ({ message, countdown, onClose }) => (
  <div
    className="alert alert-light border border-success position-absolute shadow-lg"
    role="alert"
    style={{
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    }}
  >
    <div className="m-auto">
      <h1 className="alert-heading text-success">
        <i className="bi bi-check-circle-fill"></i>
      </h1>
    </div>
    <p>{message}</p>
    <hr />
    <p className="my-3 fs-3 text-danger">Hãy kiểm tra email ngay</p>
    <p className="mb-0">Thời gian còn lại: {countdown} giây</p>
    <div className="position-absolute w-100 h-100 top-0 start-0">
      <div
        className="fs-4 ms-2 text-light position-absolute top-0 start-100"
        onClick={onClose}
      >
        <i className="bi bi-x-lg"></i>
      </div>
    </div>
  </div>
);

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading, error } = useSWR(`${apiUrl}/users`, fetcher, {
    refreshInterval: 6000,
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowAlert(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAlert]);
  // useEffect để kiểm tra cookie LOGIN_INFO
  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      console.log("Người dùng đã đăng nhập, điều hướng về trang trước đó...");
      window.location.href = "/user/tai-khoan"; // Nếu không có lịch sử, quay về trang chủ
    }
  }, []);

  if (error)
    return <div className="text-center text-danger">Lỗi load dữ liệu.</div>;
  if (isLoading)
    return (
      <div className="text-center text-success py-5">
        <div className="spinner-border"></div>
        <br />
        Đang tải...
      </div>
    );

  const checkEmailExists = async (email) => {
    return data.Users.some((user) => user.email === email)
      ? true
      : "Email không tồn tồn tại";
  };

  const onSubmit = async (formData) => {
    setIsLoadingSubmit(true);
    console.log(formData);

    try {
      const res = await fetch(`${apiUrl}/users/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailForgot: formData.email }),
      });
      const result = await res.json();
      if (!result.error) {
        setShowAlert(true);
        setCountdown(10);
      }
    } catch (error) {
      console.error("Error forgot:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="container row m-auto text-center position-relative my-5 p-sm-5">
      {/* Overlay làm mờ khi hiển thị Alert */}
      {showAlert && <Overlay />}
      <div className="col border border-dark p-sm-5 p-3">
        <h1>Đặt lại mật khẩu</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="floatingEmail"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email không được bỏ trống",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không hợp lệ",
                },
                validate: checkEmailExists,
              })}
            />
            <label htmlFor="floatingEmail">Email</label>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          {/* Nút gửi mật khẩu mới */}
          <button
            type="submit"
            className="w-100 py-3 rounded mb-3"
            style={{ backgroundColor: "#FFE08B", color: "#324B4D" }}
          >
            Gửi mật khẩu mới
          </button>

          {/* Hiển thị trạng thái đang tải */}
          {isLoadingSubmit && (
            <div className="text-center text-success py-2">
              <div className="spinner-border"></div>
              <span> Đang gửi mật khẩu mới...</span>
            </div>
          )}
        </form>
        {/* Hiển thị thông báo thành công */}
        {showAlert && (
          <Alert
            message="Bạn đã nhận được mật khẩu mới."
            countdown={countdown}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
      <div className="col border border-dark d-none d-md-flex">
        <img src="/images/logocolor.png" alt="Logo" className="w-50 m-auto" />
      </div>
    </div>
  );
}
