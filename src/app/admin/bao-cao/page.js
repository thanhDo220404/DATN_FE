"use client"; // Thêm dòng này ở đầu file

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // nhớ npm install chart.js
import { getAllUsers } from "@/app/databases/users";
import { getAllProducts } from "@/app/databases/products";
import { getAllOrders } from "@/app/databases/order";
import ListBestSellerProducts from "./components/bestSellerProducts";
import TotalOrdersTable from "./components/totalListOrders";

export default function Dashboard() {
  const lineChartRef = useRef(null); // Tham chiếu cho biểu đồ đường
  const barChartRef = useRef(null); // Tham chiếu cho biểu đồ cột

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

  function getLastSixMonths() {
    const currentDate = new Date();
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i
      );
      result.push({
        label: `${months[date.getMonth()]} ${date.getFullYear()}`,
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
    return result;
  }

  const lastSixMonths = getLastSixMonths();

  // Tính tổng số lượng đơn hàng và doanh thu theo tháng
  function calculateMonthlyData(orders) {
    const monthlyOrderCount = Array(7).fill(0);
    const monthlyRevenue = Array(7).fill(0);

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      lastSixMonths.forEach((month, index) => {
        if (
          orderDate.getMonth() === month.month &&
          orderDate.getFullYear() === month.year
        ) {
          monthlyOrderCount[index] += 1;
          // Kiểm tra trạng thái của đơn hàng trước khi tính vào doanh thu
          if (order.order_status._id !== "6724f9c943ad843da1d31150") {
            monthlyRevenue[index] += order.order_total;
          }
        }
      });
    });

    return { monthlyOrderCount, monthlyRevenue };
  }

  useEffect(() => {
    if (listOrders.length === 0) return;

    const { monthlyOrderCount, monthlyRevenue } =
      calculateMonthlyData(listOrders);

    // Cấu hình biểu đồ đường cho tổng số lượng đơn hàng
    const lineChartCtx = document
      .getElementById("lineChartDemo")
      .getContext("2d");
    if (lineChartRef.current) lineChartRef.current.destroy();
    lineChartRef.current = new Chart(lineChartCtx, {
      type: "line",
      data: {
        labels: lastSixMonths.map((month) => month.label),
        datasets: [
          {
            label: "Tổng số lượng đơn hàng",
            data: monthlyOrderCount,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: { responsive: true },
    });

    // Cấu hình biểu đồ cột cho doanh thu
    const barChartCtx = document
      .getElementById("barChartDemo")
      .getContext("2d");
    if (barChartRef.current) barChartRef.current.destroy();
    barChartRef.current = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: lastSixMonths.map((month) => month.label),
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: monthlyRevenue,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value.toLocaleString("vi-VN") + " đ",
            },
          },
        },
      },
    });

    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [listOrders]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">
                  <b>Báo cáo doanh thu </b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="widget-small info coloured-icon">
            <i className="bi bi-tags-fill icon" />
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
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small warning coloured-icon">
            <i className="bi bi-bag-fill icon" />
            <div className="info">
              <h4>Tổng đơn hàng</h4>
              <p>
                <b>{listOrders.length}</b>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="widget-small primary coloured-icon">
            <i className="bi bi-bar-chart-line-fill icon" />
            <div className="info">
              <h4>Tổng thu nhập</h4>
              <p>
                <b>
                  {listOrders
                    .filter(
                      (order) =>
                        order.order_status._id !== "6724f9c943ad843da1d31150"
                    )
                    .reduce((total, order) => total + order.order_total, 0)
                    .toLocaleString()}{" "}
                </b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small danger coloured-icon">
            <i className="bi bi-receipt icon" />
            <div className="info">
              <h4>Đơn hàng hủy</h4>
              <p>
                <b>
                  {
                    listOrders.filter(
                      (order) =>
                        order.order_status._id === "6724f9c943ad843da1d31150"
                    ).length
                  }
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <ListBestSellerProducts
          listOrders={listOrders}
          products={listProducts}
        />
      </div>
      <div className="row">
        <TotalOrdersTable listOrders={listOrders} />
      </div>
      {/* <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">SẢN PHẨM ĐÃ HẾT</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Tình trạng</th>
                    <th>Giá tiền</th>
                    <th>Danh mục</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>83826226</td>
                    <td>Tủ ly - tủ bát</td>
                    <td>
                      <img src="/img-sanpham/tu.jpg" alt="" width="100px;" />
                    </td>
                    <td>0</td>
                    <td>
                      <span className="badge bg-danger">Hết hàng</span>
                    </td>
                    <td>2.450.000 đ</td>
                    <td>Tủ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">NHÂN VIÊN MỚI</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                    <th>Chức vụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hồ Thị Thanh Ngân</td>
                    <td>155-157 Trần Quốc Thảo, Quận 3, Hồ Chí Minh </td>
                    <td>12/02/1999</td>
                    <td>Nữ</td>
                    <td>0926737168</td>
                    <td>Bán hàng</td>
                  </tr>
                  <tr>
                    <td>Trần Khả Ái</td>
                    <td>6 Nguyễn Lương Bằng, Tân Phú, Quận 7, Hồ Chí Minh</td>
                    <td>22/12/1999</td>
                    <td>Nữ</td>
                    <td>0931342432</td>
                    <td>Bán hàng</td>
                  </tr>
                  <tr>
                    <td>Nguyễn Đặng Trọng Nhân</td>
                    <td>59C Nguyễn Đình Chiểu, Quận 3, Hồ Chí Minh </td>
                    <td>23/07/1996</td>
                    <td>Nam</td>
                    <td>0846881155</td>
                    <td>Dịch vụ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      {/* Row for Charts */}
      <div className="row">
        <div className="col-md-6">
          <div className="tile">
            <h3 className="tile-title">BIỂU ĐỒ LỢI NHUẬN</h3>
            <canvas id="barChartDemo" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="tile">
            <h3 className="tile-title">THỐNG KÊ ĐƠN HÀNG</h3>
            <canvas id="lineChartDemo" />
          </div>
        </div>
      </div>
      <div className="text-right" style={{ fontSize: "12px" }}>
        <p></p>
      </div>
    </>
  );
}
