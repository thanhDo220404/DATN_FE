"use client";
import { getAllOrders } from "@/app/databases/order";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    const result = await getAllOrders();
    setOrders(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders(); // Gọi hàm fetchOrders khi component mount
  }, []);

  console.log("this is orders : ", orders);

  const handleDelete = (orderId) => {
    if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      // Thực hiện logic xóa đơn hàng ở đây
      console.log("Xóa đơn hàng với ID:", orderId);
    }
  };

  return (
    <>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách đơn hàng</b>
            </a>
          </li>
        </ul>
        <div id="clock" />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              {isLoading ? (
                <div className="text-center my-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered js-copytextarea align-middle">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Đơn hàng</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Tình trạng</th>
                        <th>Tính năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.order_address.name}</td>
                            <td>
                              {order.order_address.specific_address},{" "}
                              {order.order_address.address.district.ward.prefix}
                              , {order.order_address.address.district.ward.name}
                              , {order.order_address.address.district.name},{" "}
                              {order.order_address.address.name}
                            </td>
                            <td>
                              {order.products.slice(0, 1).map((product) => (
                                <div key={product._id}>
                                  {product.name} - {product.quantity} cái
                                </div>
                              ))}
                              {order.products.length > 1 && (
                                <span>
                                  và {order.products.length - 1} sản phẩm
                                  khác...
                                </span>
                              )}
                            </td>

                            <td>{order.products.length}</td>
                            <td>{order.order_total.toLocaleString()}đ</td>
                            <td>
                              <span
                                className={`badge ${
                                  order.order_status.name === "Đã giao hàng"
                                    ? "bg-success"
                                    : order.order_status.name === "Chờ xử lý"
                                    ? "bg-info"
                                    : order.order_status.name ===
                                      "Đang giao hàng"
                                    ? "bg-warning"
                                    : order.order_status.name === "Đã hủy"
                                    ? "bg-danger"
                                    : "bg-primary"
                                }`}
                              >
                                {order.order_status.name}
                              </span>
                            </td>
                            <td className="table-td-center">
                              <Link href={`/admin/don-hang/sua/${order._id}`}>
                                <button
                                  className="btn btn-warning btn-sm edit"
                                  type="button"
                                  title="Sửa"
                                  data-toggle="modal"
                                  data-target="#ModalUP"
                                  style={{ width: "20px", margin: "5px" }}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            Không có đơn hàng nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
