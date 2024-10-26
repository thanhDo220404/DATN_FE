"use client";
import "./style.css";

import { useEffect, useState } from "react";
import { getAllProducts } from "../databases/products";
import { getAllColors } from "../databases/color";
import { getAllSizes } from "../databases/size";
import ProductCard from "../components/productCard";
import SortColor from "../components/sortColor";
import SortSize from "../components/sortSize";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // Lưu nhiều màu đã chọn
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Trạng thái cho sắp xếp

  const fetchProducts = async () => {
    const result = await getAllProducts();
    setProducts(result);
  };

  const fetchColors = async () => {
    const result = await getAllColors();
    setColors(result);
  };

  const fetchSizes = async () => {
    const result = await getAllSizes();
    setSizes(result);
  };

  useEffect(() => {
    fetchProducts();
    fetchColors();
    fetchSizes();
  }, []);

  // Hàm xử lý khi chọn màu
  const handleColorSelect = (color) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter((c) => c !== color); // Bỏ chọn nếu đã có
      } else {
        return [...prevSelectedColors, color]; // Thêm màu mới
      }
    });
  };

  // Hàm xử lý khi chọn kích thước
  const handleSizeSelect = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size); // Bỏ chọn nếu đã có
      } else {
        return [...prevSelectedSizes, size]; // Thêm kích thước mới
      }
    });
  };

  // Lọc sản phẩm theo màu sắc và kích thước đã chọn
  const filteredProducts = products.filter((product) => {
    const hasColor =
      selectedColors.length === 0 ||
      product.items.some((item) =>
        selectedColors.some(
          (selectedColor) => selectedColor._id === item.color._id
        )
      );

    const hasSize =
      selectedSizes.length === 0 ||
      product.items.some((item) =>
        item.variations.some((variation) =>
          selectedSizes.some(
            (selectedSize) => selectedSize._id === variation.size._id
          )
        )
      );

    return hasColor && hasSize; // Chỉ hiển thị sản phẩm nếu có màu và kích thước được chọn
  });
  // const filteredProducts = products.filter((product) => {
  //   // Kiểm tra xem sản phẩm có ít nhất một item với màu và kích thước đã chọn
  //   const hasValidItem = product.items.some((item) => {
  //     const colorMatches = selectedColors.length === 0 ||
  //       selectedColors.some((selectedColor) => selectedColor._id === item.color._id);

  //     const sizeMatches = selectedSizes.length === 0 ||
  //       item.variations.some((variation) =>
  //         selectedSizes.some((selectedSize) => selectedSize._id === variation.size._id)
  //       );

  //     return colorMatches && sizeMatches; // Trả về true nếu item có cả màu và kích thước phù hợp
  //   });

  //   return hasValidItem; // Chỉ hiển thị sản phẩm nếu có ít nhất một item hợp lệ
  // });

  // Sắp xếp sản phẩm theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getLowestPrice = (product) => {
      return Math.min(...product.items.map((item) => item.price));
    };

    const priceA = getLowestPrice(a);
    const priceB = getLowestPrice(b);

    if (sortOrder === "asc") {
      return priceA - priceB; // Giá tăng dần
    } else if (sortOrder === "desc") {
      return priceB - priceA; // Giá giảm dần
    }
    return 0; // Không sắp xếp nếu không có giá trị sắp xếp
  });

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h3 className="product-title">Sản Phẩm</h3>

          <div className="col-3">
            <SortColor
              colors={colors}
              selectedColors={selectedColors}
              onColorSelect={handleColorSelect}
            />
            <SortSize
              sizes={sizes}
              selectedSizes={selectedSizes}
              onSizeSelect={handleSizeSelect}
            />
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-9">
                <div className="d-flex flex-wrap gap-1">
                  {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                    <>
                      <div className="fs-5 w-100">Đang dùng bộ lọc:</div>
                      {selectedColors.map((color, index) => (
                        <div className="border p-3 me-2 d-flex" key={index}>
                          {color.name}
                          <div
                            className="btn-close"
                            onClick={() => handleColorSelect(color)} // Gọi hàm để xóa màu sắc
                          ></div>
                        </div>
                      ))}
                      {selectedSizes.map((size, index) => (
                        <div className="border p-3 me-2 d-flex" key={index}>
                          {size.name}
                          <div
                            className="btn-close"
                            onClick={() => handleSizeSelect(size)} // Gọi hàm để xóa kích thước
                          ></div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="col-3">
                <select
                  className="form-select w-auto float-end"
                  onChange={(e) => setSortOrder(e.target.value)} // Cập nhật giá trị sắp xếp
                >
                  <option value="">Mặt định</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
            <div className="row featured-products">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}