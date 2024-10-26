"use client";
import "../style.css";
import { useEffect, useState } from "react";
import { getProductById } from "@/app/databases/products";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State để lưu item được chọn
  const [selectedVariation, setSelectedVariation] = useState(null); // State để lưu variation được chọn
  const [quantity, setQuantity] = useState(1); // Trạng thái để lưu số lượng

  const fetchProduct = async (id) => {
    const result = await getProductById(id);
    setProduct(result.product);
    setSelectedItem(result.product.items[0]); // Khởi tạo item được chọn là item đầu tiên
    setSelectedVariation(result.product.items[0].variations[0]); // Khởi tạo variation đầu tiên
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  // Kiểm tra xem product đã được tải hay chưa
  if (!product) {
    return <div>Loading...</div>; // Hoặc có thể hiển thị một loading spinner
  }

  // Hàm xử lý khi chọn màu
  const handleColorSelect = (item) => {
    setSelectedItem(item); // Cập nhật item được chọn
    setSelectedVariation(item.variations[0]); // Cập nhật variation đầu tiên của item
    setQuantity(1); // Đặt lại số lượng về 1
  };

  // Tính tổng số lượng từ variation đã chọn hoặc từ tất cả các variations
  const totalQuantity = selectedVariation
    ? selectedVariation.quantity // Nếu có variation đã chọn, sử dụng số lượng của nó
    : selectedItem.variations.reduce(
        (total, variation) => total + variation.quantity,
        0
      );
  console.log("this is product: ", product);
  console.log("this is item: ", selectedItem);
  console.log("this is variation: ", selectedVariation);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="product-image">
            <img
              alt="Product Image"
              className="img-fluid"
              id="main-image"
              src={selectedItem.image.mediaFilePath} // Sử dụng hình ảnh từ item được chọn
            />
          </div>
          <div className="thumbnail-images">
            {product.items.map((item, index) => (
              <img
                key={index}
                className={`${
                  selectedItem.image._id === item.image._id ? "active" : ""
                }`} // Thêm class sortActive nếu màu được chọn
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleColorSelect(item)} // Gọi hàm khi nhấp vào hình ảnh thu nhỏ
                src={item.image.mediaFilePath} // Hình ảnh thu nhỏ từ dữ liệu sản phẩm
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="price">
            {selectedItem.price.toLocaleString("vi-VN")}đ{" "}
            {selectedItem.discount > 0 && (
              <span className="old-price">
                {(
                  selectedItem.price *
                  (1 + selectedItem.discount / 100)
                ).toLocaleString("vi-VN")}
                đ
              </span>
            )}
          </div>
          <div className="product-options">
            {/* Hiển thị màu sắc */}
            <div className="mb-3">
              <label htmlFor="color-options">Màu sắc:</label>
              <div id="color-options">
                {product.items.map((item) => (
                  <div
                    key={item.color._id}
                    className={`btn me-2 ${
                      selectedItem.color._id === item.color._id
                        ? "sortActive"
                        : ""
                    }`} // Thêm class sortActive nếu màu được chọn
                    style={{
                      backgroundColor: item.color.colorHexCode,
                      width: "50px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleColorSelect(item)} // Gọi hàm khi nhấp vào màu
                  ></div>
                ))}
              </div>
            </div>
            {/* Hiển thị kích thước */}
            <div className="mb-3">
              <label htmlFor="size-options">Kích thước:</label>
              <div id="size-options">
                {selectedItem.variations.map((variation) => (
                  <button
                    key={variation.size._id}
                    className={`my-size-items me-3 ${
                      selectedVariation &&
                      selectedVariation._id === variation._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setQuantity(1); // Đặt lại số lượng khi chọn kích thước
                      setSelectedVariation(variation); // Gán variation đã chọn
                    }}
                  >
                    {variation.size.sizeName}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity">Số lượng:</label>
              <div className="d-flex align-items-center">
                <button
                  className="my-input my-btn my-btn-secondary me-2"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Math.min(
                          selectedVariation
                            ? selectedVariation.quantity
                            : totalQuantity,
                          e.target.value
                        )
                      )
                    )
                  }
                  className="my-input text-center"
                  min="1"
                  max={totalQuantity}
                />
                <button
                  className="my-input my-btn my-btn-secondary ms-2"
                  onClick={() =>
                    setQuantity(
                      quantity + 1 <=
                        (selectedVariation
                          ? selectedVariation.quantity
                          : totalQuantity)
                        ? quantity + 1
                        : quantity
                    )
                  }
                >
                  +
                </button>
                <span className="ms-3">
                  {selectedVariation
                    ? selectedVariation.quantity
                    : totalQuantity}{" "}
                  còn lại
                </span>
              </div>
            </div>
          </div>
          <button className="btn btn-warning btn-lg">MUA NGAY</button>
          <button className="btn btn-outline-secondary btn-lg">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="details-section row mt-4">
        <div className="col-md-6">
          <h5>DETAILS</h5>
          <p>
            <strong>Mô tả:</strong> {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
