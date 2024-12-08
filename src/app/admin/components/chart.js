import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function ChartComponent({
  chartElementId,
  title,
  orders,
  chartType,
  chartDatasetsLabel,
  useRevenue,
  borderColor,
  backgroundColor,
}) {
  const chart = useRef(null);
  const [filter, setFilter] = useState("days"); // Mặc định là "Ngày"

  // Hàm lấy 6 ngày gần nhất
  function getLastSixDays() {
    const currentDate = new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i); // Trừ đi số ngày tương ứng
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const year = date.getFullYear();
      result.push({
        label: `${day}/${month}/${year}`,
        day: day,
        month: month,
        year: year,
      });
    }
    return result;
  }

  // Hàm lấy 6 tháng gần nhất
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

  // Hàm lấy 6 năm gần nhất
  function getLastSixYears() {
    const currentDate = new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const year = currentDate.getFullYear() - i;
      result.push({
        label: `${year}`,
        year: year,
      });
    }
    return result;
  }

  // Lọc dữ liệu theo ngày, tháng, hoặc năm
  function getFilteredData() {
    if (filter === "days") return getLastSixDays();
    if (filter === "months") return getLastSixMonths();
    if (filter === "years") return getLastSixYears();
  }

  const filteredData = getFilteredData(); // Lấy dữ liệu lọc

  // Tính tổng số lượng đơn hàng và doanh thu
  function calculateFilteredData(orders) {
    const orderCount = Array(filteredData.length).fill(0);
    const revenue = Array(filteredData.length).fill(0);

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      filteredData.forEach((period, index) => {
        if (
          filter === "days" &&
          orderDate.getDate() === period.day &&
          orderDate.getMonth() + 1 === period.month &&
          orderDate.getFullYear() === period.year
        ) {
          orderCount[index] += 1;
          if (order.order_status._id !== "6724f9c943ad843da1d31150") {
            revenue[index] += order.order_total;
          }
        }
        if (
          filter === "months" &&
          orderDate.getMonth() === period.month &&
          orderDate.getFullYear() === period.year
        ) {
          orderCount[index] += 1;
          if (order.order_status._id !== "6724f9c943ad843da1d31150") {
            revenue[index] += order.order_total;
          }
        }
        if (filter === "years" && orderDate.getFullYear() === period.year) {
          orderCount[index] += 1;
          if (order.order_status._id !== "6724f9c943ad843da1d31150") {
            revenue[index] += order.order_total;
          }
        }
      });
    });

    return { orderCount, revenue };
  }

  useEffect(() => {
    if (orders.length === 0) return;

    const { orderCount, revenue } = calculateFilteredData(orders);

    // Vẽ lại biểu đồ sau khi dữ liệu thay đổi
    const chartCtx = document.getElementById(chartElementId).getContext("2d");
    if (chart.current) chart.current.destroy();
    chart.current = new Chart(chartCtx, {
      type: chartType,
      data: {
        labels: filteredData.map((period) => period.label),
        datasets: [
          {
            label: chartDatasetsLabel,
            data: useRevenue ? revenue : orderCount,
            borderColor: borderColor && "rgba(75, 192, 192, 1)",
            backgroundColor: backgroundColor && "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: { responsive: true },
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };
  }, [orders, filter]); // Cập nhật khi `orders` hoặc `filter` thay đổi

  return (
    <div className="tile">
      <div className="tile-title text-uppercase d-flex justify-content-between">
        <h3>{title}</h3>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="days">Ngày</option>
          <option value="months">Tháng</option>
          <option value="years">Năm</option>
        </select>
      </div>

      <div className="embed-responsive embed-responsive-16by9">
        <canvas className="embed-responsive-item" id={chartElementId} />
      </div>
    </div>
  );
}
