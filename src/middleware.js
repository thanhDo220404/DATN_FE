// middleware.js
import { NextResponse } from "next/server";
import { parseJwt } from "./app/databases/users";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("LOGIN_INFO");

  if (!token) {
    url.pathname = "/buyer/dang-nhap";
    return NextResponse.redirect(url);
  }

  const payload = parseJwt(token.value);
  if (!payload) {
    url.pathname = "/buyer/dang-nhap";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/admin") && payload.role !== 1) {
    url.pathname = "/user/tai-khoan";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/tai-khoan/:path*", "/admin/:path*", "/gio-hang/:path*"],
};
