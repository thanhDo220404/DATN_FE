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
            src="../images/sp7.jpg"
            style={{ width: "70px", height: "70px" }}
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
              <span className="app-menu__label">Dashboard</span>
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

      {/* nội dung */}
      <main className="app-content">
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
            <div className="widget-small primary coloured-icon">
              <i className="bi bi-person-fill icon" />
              <div className="info">
                <h4>Tổng Nhân viên</h4>
                <p>
                  <b>26 nhân viên</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small info coloured-icon">
              <i className="bi bi-tags-fill icon" />
              <div className="info">
                <h4>Tổng sản phẩm</h4>
                <p>
                  <b>8580 sản phẩm</b>
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
                  <b>457 đơn hàng</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small danger coloured-icon">
              <i className="bi bi-info-circle-fill icon" />
              <div className="info">
                <h4>Bị cấm</h4>
                <p>
                  <b>4 nhân viên</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="widget-small primary coloured-icon">
              <i className="bi bi-bar-chart-line-fill icon" />
              <div className="info">
                <h4>Tổng thu nhập</h4>
                <p>
                  <b>104.890.000 đ</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small info coloured-icon">
              <i className="bi bi-person-badge-fill icon" />
              <div className="info">
                <h4>Nhân viên mới</h4>
                <p>
                  <b>3 nhân viên</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small warning coloured-icon">
              <i className="bi bi-tag-fill icon" />
              <div className="info">
                <h4>Hết hàng</h4>
                <p>
                  <b>1 sản phẩm</b>
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
                  <b>2 đơn hàng</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div>
                <h3 className="tile-title">SẢN PHẨM BÁN CHẠY</h3>
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
                      <th>Giá tiền</th>
                      <th>Danh mục</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>71309005</td>
                      <td>Bàn ăn gỗ Theresa</td>
                      <td>5.600.000 đ</td>
                      <td>Bàn ăn</td>
                    </tr>
                    <tr>
                      <td>62304003</td>
                      <td>Bàn ăn Vitali mặt đá</td>
                      <td>33.235.000 đ</td>
                      <td>Bàn ăn</td>
                    </tr>
                    <tr>
                      <td>72109004</td>
                      <td>Ghế làm việc Zuno</td>
                      <td>3.800.000 đ</td>
                      <td>Ghế gỗ</td>
                    </tr>
                    <tr>
                      <td>83826226</td>
                      <td>Tủ ly - tủ bát</td>
                      <td>2.450.000 đ</td>
                      <td>Tủ</td>
                    </tr>
                    <tr>
                      <td>71304041</td>
                      <td>Bàn ăn mở rộng Vegas</td>
                      <td>21.550.000 đ</td>
                      <td>Bàn thông minh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div>
                <h3 className="tile-title">TỔNG ĐƠN HÀNG</h3>
              </div>
              <div className="tile-body">
                <table
                  className="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th>ID đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Đơn hàng</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MD0837</td>
                      <td>Triệu Thanh Phú</td>
                      <td>Ghế làm việc Zuno, Bàn ăn gỗ Theresa</td>
                      <td>2 sản phẩm</td>
                      <td>9.400.000 đ</td>
                    </tr>
                    <tr>
                      <td>MĐ8265</td>
                      <td>Nguyễn Thị Ngọc Cẩm</td>
                      <td>Ghế ăn gỗ Lucy màu trắng</td>
                      <td>1 sản phẩm</td>
                      <td>3.800.000 đ</td>
                    </tr>
                    <tr>
                      <td>MT9835</td>
                      <td>Đặng Hoàng Phúc</td>
                      <td>
                        Giường ngủ Jimmy, Bàn ăn mở rộng cao cấp Dolas, Ghế làm
                        việc Zuno
                      </td>
                      <td>3 sản phẩm</td>
                      <td>40.650.000 đ</td>
                    </tr>
                    <tr>
                      <td>ER3835</td>
                      <td>Nguyễn Thị Mỹ Yến</td>
                      <td>Bàn ăn mở rộng Gepa</td>
                      <td>1 sản phẩm</td>
                      <td>16.770.000 đ</td>
                    </tr>
                    <tr>
                      <td>AL3947</td>
                      <td>Phạm Thị Ngọc</td>
                      <td>Bàn ăn Vitali mặt đá, Ghế ăn gỗ Lucy màu trắng</td>
                      <td>2 sản phẩm</td>
                      <td>19.770.000 đ</td>
                    </tr>
                    <tr>
                      <td>QY8723</td>
                      <td>Ngô Thái An</td>
                      <td>Giường ngủ Kara 1.6x2m</td>
                      <td>1 sản phẩm</td>
                      <td>14.500.000 đ</td>
                    </tr>
                    <tr>
                      <th colSpan={4}>Tổng cộng:</th>
                      <td>104.890.000 đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
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
        </div>
        <div className="row">
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
        </div>
      {/* Row for Charts */}
      <div className="row">
          <div className="col-md-6">
            <div className="tile">
              <h3 className="tile-title">THỐNG KÊ DOANH SỐ</h3>
              <canvas id="barChartDemo" />
            </div>
          </div>
          <div className="col-md-6">
          <div className="tile">
              <h3 className="tile-title">DỮ LIỆU HÀNG THÁNG</h3>
              <canvas id="lineChartDemo" />
            </div>
          </div>
        </div>
        <div className="text-right" style={{ fontSize: "12px" }}>
          <p>
            <b>Hệ thống quản lý V2.0 | Code by Trường</b>
          </p>
        </div>
      </main>

      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
