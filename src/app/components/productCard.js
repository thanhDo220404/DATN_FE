import Link from "next/link";
import React, { useState } from "react";

export default function ProductCard({ product }) {
  const [selectedItem, setSelectedItem] = useState(product.items?.[0]); // Khởi tạo item được chọn là item đầu tiên
  const [selectedColorId, setSelectedColorId] = useState(
    selectedItem.color._id
  ); // Khởi tạo màu đã chọn

  // Hàm xử lý khi chọn màu
  const handleItemSelect = (item) => {
    setSelectedItem(item); // Cập nhật item được chọn
    setSelectedColorId(item.color._id); // Cập nhật màu đã chọn
  };

  console.log(selectedItem);

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="my-card-header my-relative">
          <Link href={`/san-pham/${product._id}`}>
            <img
              alt={product.name}
              className="card-img-top"
              src={selectedItem?.image?.mediaFilePath || ""}
            />
          </Link>

          <div className="my-absolute w-100 p-2">
            <div className="w-100 my-backdrop-filter">
              {selectedItem.variations.map((variation, index) => (
                <div key={index} className="my-size-items">
                  {/* Hiển thị tên kích thước */}
                  {variation.size.sizeName}
                  {/* Nếu cần có thể thêm các thuộc tính khác */}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="d-flex">
            {product.items.map((item, index) => (
              <div key={index} className="me-2">
                <span
                  className={`color-indicator border ${
                    selectedColorId === item.color._id ? "sortActive" : ""
                  }`} // Thêm class sortActive nếu màu hiện tại được chọn
                  style={{
                    backgroundColor: item.color.colorHexCode,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    cursor: "pointer", // Thêm con trỏ để cho thấy có thể nhấp được
                  }}
                  onClick={() => handleItemSelect(item)} // Gọi hàm khi nhấp vào màu
                ></span>
                {item.color.name} {/* Hiển thị tên màu */}
              </div>
            ))}
          </div>
          <Link href={`/san-pham/${product._id}`}>
            <h5 className="card-title">{product.name}</h5>
          </Link>
          <p className="card-text">
            {selectedItem?.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
            {selectedItem?.discount && (
              <del>
                {(
                  selectedItem.price *
                  (1 + selectedItem.discount / 100)
                ).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </del>
            )}
          </p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-warning">MUA NGAY</button>
            <a
              href={`/san-pham/${product._id}`}
              className="btn btn-outline-secondary"
            >
              Xem chi tiết
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
