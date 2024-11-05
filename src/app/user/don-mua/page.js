"use client";
import { getOrdersByUserId } from "@/app/databases/order";
import { parseJwt } from "@/app/databases/users";
import { getCookie } from "@/app/lib/CookieManager";
import { useEffect, useState } from "react";
import Link from "next/link"; // Đừng quên import Link

export default function Purchure() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (userId) => {
    const result = await getOrdersByUserId(userId);
    setOrders(result);
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      const payload = parseJwt(token);
      fetchOrders(payload._id);
    }
  }, []);

  return (
    <>
      <div className="fs-5">
        <div className="position-relative">
          <div className="bg-white position-sticky top-0 shadow-sm">
            <div className="d-flex justify-content-between">
              <div className="p-3 border-bottom border-primary border-3">
                Tất cả
              </div>
              <div className="p-3">Chờ thanh toán</div>
              <div className="p-3">Vận chuyển</div>
              <div className="p-3">Chờ giao hàng</div>
              <div className="p-3">Hoàn Thành</div>
              <div className="p-3">Đã hủy</div>
              <div className="p-3">Trả hàng / hoàn tiền</div>
            </div>
          </div>
          {orders.map((order) => (
            <div className="bg-white mt-3 p-3" key={order._id}>
              <div className="text-end text-success">
                <i class="bi bi-truck"></i> {order.order_status.name}
              </div>
              <table className="table align-middle">
                <tbody>
                  {order.products.map((cartItem, index) => {
                    const price =
                      cartItem.items.price *
                      (1 - cartItem.items.discount / 100);
                    const total = price * cartItem.quantity;

                    return (
                      <tr key={cartItem._id} className="border-bottom">
                        <td>
                          <Link href={`/san-pham/${cartItem._id}`}>
                            <div className="d-flex align-items-center">
                              <img
                                src={cartItem.items.image.mediaFilePath}
                                alt={cartItem.name}
                                className="rounded me-3"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                              <div>
                                <p className="mb-1 fw-bold">{cartItem.name}</p>
                                <small className="text-muted">
                                  {cartItem.items.color.colorName} -{" "}
                                  {cartItem.items.variations.size.sizeName}
                                </small>
                                <p>
                                  <small className="text-muted">
                                    x {cartItem.quantity}
                                  </small>
                                </p>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="text-end">
                          {cartItem.items.discount > 0 && (
                            <del className="me-2 text-secondary">
                              {cartItem.items.price.toLocaleString()} ₫
                            </del>
                          )}
                          {price.toLocaleString()} ₫
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="">
                <div className="text-end">
                  <span>
                    Thành tiền :{" "}
                    <span className="fs-4 text-primary">
                      {order.order_total.toLocaleString()} ₫
                    </span>
                  </span>
                </div>
                <div className="text-end">
                  <button className="btn btn-danger">Hủy đơn</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
