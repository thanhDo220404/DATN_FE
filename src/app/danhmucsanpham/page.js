"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductCategoryPage() {
  // Danh sách các danh mục cụ thể
  const categories = [
    { id: 1, name: "ÁO THUN - T SHIRT" },
    { id: 2, name: "QUẦN - PANTS" },
    { id: 3, name: "ÁO KHOÁC - HOODIE" },
    { id: 4, name: "PHỤ KIỆN - ACCESSORY" },
  ];

  // Dữ liệu sản phẩm mô phỏng
  const allProducts = Array(20)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `Sản phẩm ${index + 1}`,
      price: Math.floor(Math.random() * 300000) + 100000,
      originalPrice: Math.floor(Math.random() * 500000) + 300000,
      image: `/images/sp${(index % 8) + 1}.jpg`,
      categoryId: Math.floor(Math.random() * 4) + 1, // Gán ngẫu nhiên một danh mục
    }));

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    if (selectedCategory) {
      setProducts(
        allProducts.filter((product) => product.categoryId === selectedCategory)
      );
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mt-5">
      {/* Tiêu đề Danh mục */}
      <h1 className="mb-4">Danh Mục Sản Phẩm</h1>

      {/* Danh sách danh mục */}
      <div className="mb-4">
        <button
          className={`btn ${
            !selectedCategory ? "btn-primary" : "btn-outline-primary"
          } me-2`}
          onClick={() => handleCategoryChange(null)}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`btn ${
              selectedCategory === category.id
                ? "btn-primary"
                : "btn-outline-primary"
            } me-2`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Bộ lọc và Sắp xếp */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <select className="form-select">
            <option>Lọc theo</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
            <option>Mới nhất</option>
          </select>
        </div>
        <div>
          <span>{products.length} sản phẩm</span>
        </div>
      </div>

      {/* Lưới Sản phẩm */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.price.toLocaleString()}đ{" "}
                  <del>{product.originalPrice.toLocaleString()}đ</del>
                </p>
                <p className="card-text">
                  Danh mục:{" "}
                  {categories.find((c) => c.id === product.categoryId).name}
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning">MUA NGAY</button>
                  <button className="btn btn-outline-secondary">
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <nav aria-label="Điều hướng trang" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Trước
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Sau
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
