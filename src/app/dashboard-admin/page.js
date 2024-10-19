"use client"; // Thêm dòng này ở đầu file

import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chart from "chart.js/auto"; // nhớ npm install chart.js

import "../main.css";

export default function Dashboard() {
  const lineChartRef = useRef(null); // Tham chiếu cho biểu đồ đường
  const barChartRef = useRef(null); // Tham chiếu cho biểu đồ cột

  useEffect(() => {
    // Biểu đồ đường - Line Chart
    const lineChartCtx = document
      .getElementById("lineChartDemo")
      .getContext("2d");
    lineChartRef.current = new Chart(lineChartCtx, {
      type: "line",
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
        ],
        datasets: [
          {
            label: "Dữ liệu đầu vào",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Biểu đồ cột - Bar Chart
    const barChartCtx = document
      .getElementById("barChartDemo")
      .getContext("2d");
    barChartRef.current = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
        ],
        datasets: [
          {
            label: "Doanh thu",
            data: [15000000, 20000000, 25000000, 30000000, 35000000, 40000000],
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
          },
        },
      },
    });

    return () => {
      // Cleanup biểu đồ khi component bị unmount
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
    {/* thanh nav */}
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="/images/hay.jpg"
            width="50px"
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>Võ Trường</b>
            </p>
            <p className="app-sidebar__user-designation">
              Chào mừng bạn trở lại
            </p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
          <li>
            <a className="app-menu__item active" href="index.html">
              <i className="bi bi-speedometer2" />
              <span className="app-menu__label">dashboard</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
              <i className="bi bi-person" />
              <span className="app-menu__label">Quản lý người dùng</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-oder.html">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý danh mục</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-product.html">
              <i className="bi bi-tag" />
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-oder.html">
              <i className="bi bi-list-task" />
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </a>
          </li>
          {/* <li>
            <a className="app-menu__item" href="table-data-money.html">
              <i className="bi bi-currency-dollar" />
              <span className="app-menu__label">Quản lý kho hàng</span>
            </a>
          </li> */}
          <li>
            <a className="app-menu__item" href="quan-ly-bao-cao.html">
              <i className="bi bi-bar-chart-line" />
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
              <i className="bi bi-gear" />
              <span className="app-menu__label">Cài đặt hệ thống</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* nội dung  */}
      <main className="app-content">
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
          {/*Left*/}
          <div className="col-md-12 col-lg-6">
            <div className="row">
              {/* col-6 */}
              <div className="col-md-6">
                <div className="widget-small primary coloured-icon">
                  <i className="bi bi-people-fill fa-3x" />
                  <div className="info">
                    <h4>Tổng khách hàng</h4>
                    <p>
                      <b>56 khách hàng</b>
                    </p>
                    <p className="info-tong">
                      Tổng số khách hàng được quản lý.
                    </p>
                  </div>
                </div>
              </div>
              {/* col-6 */}
              <div className="col-md-6">
                <div className="widget-small info coloured-icon">
                  <i className="bi bi-box-seam fa-3x" />
                  <div className="info">
                    <h4>Tổng sản phẩm</h4>
                    <p>
                      <b>1850 sản phẩm</b>
                    </p>
                    <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                  </div>
                </div>
              </div>
              {/* col-6 */}
              <div className="col-md-6">
                <div className="widget-small warning coloured-icon">
                  <i className="bi bi-bag-fill fa-3x" />
                  <div className="info">
                    <h4>Tổng đơn hàng</h4>
                    <p>
                      <b>247 đơn hàng</b>
                    </p>
                    <p className="info-tong">
                      Tổng số hóa đơn bán hàng trong tháng.
                    </p>
                  </div>
                </div>
              </div>
              {/* col-6 */}
              <div className="col-md-6">
                <div className="widget-small danger coloured-icon">
                  <i className="bi bi-exclamation-triangle-fill fa-3x" />
                  <div className="info">
                    <h4>Sắp hết hàng</h4>
                    <p>
                      <b>4 sản phẩm</b>
                    </p>
                    <p className="info-tong">
                      Số sản phẩm cảnh báo hết cần nhập thêm.
                    </p>
                  </div>
                </div>
              </div>
              {/* col-12 */}
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
                        <tr>
                          <td>AL3947</td>
                          <td>Phạm Thị Ngọc</td>
                          <td>19.770.000 đ</td>
                          <td>
                            <span className="badge bg-info">Chờ xử lý</span>
                          </td>
                        </tr>
                        <tr>
                          <td>ER3835</td>
                          <td>Nguyễn Thị Mỹ Yến</td>
                          <td>16.770.000 đ</td>
                          <td>
                            <span className="badge bg-warning">
                              Đang vận chuyển
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>MD0837</td>
                          <td>Triệu Thanh Phú</td>
                          <td>9.400.000 đ</td>
                          <td>
                            <span className="badge bg-success">
                              Đã hoàn thành
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>MT9835</td>
                          <td>Đặng Hoàng Phúc</td>
                          <td>40.650.000 đ</td>
                          <td>
                            <span className="badge bg-danger">Đã hủy</span>
                          </td>
                        </tr>
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
                          <th>Ngày sinh</th>
                          <th>Số điện thoại</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#183</td>
                          <td>Hột vịt muối</td>
                          <td>21/7/1992</td>
                          <td>
                            <span className="tag tag-success">0921387221</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#219</td>
                          <td>Bánh tráng trộn</td>
                          <td>30/4/1975</td>
                          <td>
                            <span className="tag tag-warning">0912376352</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#627</td>
                          <td>Cút rang bơ</td>
                          <td>12/3/1999</td>
                          <td>
                            <span className="tag tag-primary">01287326654</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#175</td>
                          <td>Hủ tiếu nam vang</td>
                          <td>4/12/20000</td>
                          <td>
                            <span className="tag tag-danger">0912376763</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END left*/}
          {/*Right*/}
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <div className="tile">
                  <h3 className="tile-title">Dữ liệu 6 tháng đầu vào</h3>
                  <div className="embed-responsive embed-responsive-16by9">
                    <canvas
                      className="embed-responsive-item"
                      id="lineChartDemo"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="tile">
                  <h3 className="tile-title">Thống kê 6 tháng doanh thu</h3>
                  <div className="embed-responsive embed-responsive-16by9">
                    <canvas
                      className="embed-responsive-item"
                      id="barChartDemo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*END right */}
        </div>
        <div className="text-center" style={{ fontSize: "13px" }}>
          <p>
            <b>Copyright Phần mềm quản lý bán hàng | Dev By Trường</b>
          </p>
        </div>
      </main>
      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
