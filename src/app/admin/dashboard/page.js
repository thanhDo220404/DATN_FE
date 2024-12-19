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
                              order.order_status && 
                              order.order_status._id !== "6724f9c943ad843da1d31150"
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
            <div >
              <div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END left*/}
        {/*Right*/}
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <ChartComponent
                chartElementId={"chartOrderCount"}
                title={"THỐNG KÊ ĐƠN HÀNG"}
                chartType={"line"}
                orders={listOrders}
                chartDatasetsLabel={"Tổng số lượng đơn hàng"}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <ChartComponent
                chartElementId={"chartRevenue"}
                title={"THỐNG KÊ DOANH THU"}
                chartType={"bar"}
                orders={listOrders}
                chartDatasetsLabel={"Tổng doanh thu"}
                useRevenue={true}
                borderColor={"rgba(255, 99, 132, 1)"}
                backgroundColor={"rgba(255, 99, 132, 0.2)"}
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
