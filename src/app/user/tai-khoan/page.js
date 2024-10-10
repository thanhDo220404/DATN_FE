"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến /user/tai-khoan/ho-so khi truy cập vào /user/tai-khoan
    router.push("/user/tai-khoan/ho-so");
  }, [router]);

  return null; // Không cần render gì cả
}
