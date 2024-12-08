"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllUsers } from "@/app/databases/users";
import { getAllProducts } from "@/app/databases/products";
import { getAllOrders } from "@/app/databases/order";
import ChartComponent from "../components/chart";

export default function Dashboard() {
  const [listUsers, setListUsers] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [listOrders, setListOrders] = useState([]);

  const fetchOrders = async () => {
    const result = await getAllOrders();
    setListOrders(result);
    console.log(result);
  };

  const fetchUsers = async () => {
    const result = await getAllUsers();
    const filteredUsers = result.Users.filter((user) => user.role === 0);
    setListUsers(filteredUsers);
    console.log(filteredUsers);
  };

  const fetchProducts = async () => {
    const result = await getAllProducts();
    setListProducts(result);
  };
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <>
      {/* nội dung  */}
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">
                  <b>Bảng điều khiển</b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="widget-small primary coloured-icon">
                <i className="bi bi-people-fill fa-3x" />
                <div className="info">
                  <h4>Tổng khách hàng</h4>
                  <p>
                    <b>{listUsers.length}</b>
                  </p>
                  <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="widget-small info coloured-icon">
                <i className="bi bi-box-seam fa-3x" />
                <div className="info">
                  <h4>Tổng sản phẩm</h4>
                  <p>
                    <b>
                      {listProducts.length > 0 &&
                        // Tính toán tổng số lượng của tất cả các variations
                        listProducts.reduce((total, product) => {
                          return (
                            total +
                            product.items.reduce(
                              (itemTotal, item) =>
                                itemTotal +
                                item.variations.reduce(
                                  (variationTotal, variation) => {
                                    return variationTotal + variation.quantity; // Cộng quantity của từng variation
                                  },
                                  0
                                ),
                              0
                            )
                          );
                        }, 0)}
                    </b>
                  </p>

                  <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="widget-small warning coloured-icon">
                <i className="bi bi-bag-fill fa-3x" />
                <div className="info">
                  <h4>Tổng đơn hàng</h4>
                  <p>
                    <b>{listOrders.length}</b>
                  </p>
                  <p className="info-tong">Tổng số hóa đơn bán hàng.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="widget-small danger coloured-icon">
                <i className="bi bi-exclamation-triangle-fill fa-3x" />
                <div className="info">
                  <h4>Tổng doanh thu</h4>
                  <p>
                    <b>
                      {/* Tính tổng doanh thu của những đơn hàng có order_status._id là 6724f9c943ad843da1d3114f */}
                      {listOrders
                        .filter(
                          (order) =>
                            order.order_status._id !==
                            "6724f9c943ad843da1d31150"
                        )
                        .reduce((total, order) => total + order.order_total, 0)
                        .toLocaleString()}
                      {" đ"}
                      {/* Hiển thị tổng doanh thu đã được định dạng */}
                    </b>
                  </p>
                  <p className="info-tong">
                    Tổng số tiền thu được từ các đơn hàng.
                  </p>
                </div>
              </div>
            </div>

            {/* Đơn hàng mới*/}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Tình trạng đơn hàng</h3>
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOrders
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        ) // Sắp xếp đơn hàng theo thời gian từ mới đến cũ
                        .slice(0, 4) // Lấy 4 đơn hàng mới nhất
                        .map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.order_address.name}</td>
                            <td>
                              {order.order_total.toLocaleString("vi-VN")} đ
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  order.order_status.name === "Chờ xử lý"
                                    ? "bg-info" // Trạng thái "Chờ xử lý" -> màu bg-info
                                    : order.order_status.name === "Đã xác nhận"
                                    ? "bg-primary" // Trạng thái "Đã xác nhận" -> màu bg-primary
                                    : order.order_status.name ===
                                      "Đang giao hàng"
                                    ? "bg-warning" // Trạng thái "Đang giao hàng" -> màu bg-warning
                                    : order.order_status.name === "Đã giao hàng"
                                    ? "bg-success" // Trạng thái "Đã giao hàng" -> màu bg-success
                                    : "bg-danger" // Trạng thái "Đã hủy" -> màu bg-danger
                                }`}
                              >
                                {order.order_status.name}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Khách hàng mới */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Khách hàng mới</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUsers.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`tag tag-${user.status}`}>
                              {user.phone}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END left*/}
        {/*Right*/}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <ChartComponent
                chartElementId={"chartOrderCount"}
                title={"THỐNG KÊ ĐƠN HÀNG"}
                chartType={"line"}
                orders={listOrders}
                chartDatasetsLabel={"Tổng số lượng đơn hàng"}
              />
            </div>
            <div className="col-md-6">
              <ChartComponent
                chartElementId={"chartRevenue"}
                title={"THỐNG KÊ ĐƠN HÀNG"}
                chartType={"bar"}
                orders={listOrders}
                chartDatasetsLabel={"Tổng số lượng đơn hàng"}
                useRevenue={true}
                backgroundColor={"rgba(255, 99, 132, 0.2)"}
                borderColor={"rgba(255, 99, 132, 1)"}
              />
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
        {/*END right */}
      </div>
      <div className="text-center" style={{ fontSize: "13px" }}>
        <p></p>
      </div>
    </>
  );
}
