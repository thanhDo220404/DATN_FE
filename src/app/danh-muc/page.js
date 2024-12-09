"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "../databases/products";
import { getAllCategories } from "../databases/categories";

export default function ProductCategoryPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchProducts = async () => {
    const result = await getAllProducts();
    setProducts(result);
  };
  const fetchCategories = async () => {
    const result = await getAllCategories();
    setCategories(result);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <div className="container mt-5">
      <h3 className="product-title">Danh mục</h3>

      <div className="row product-category">
        {categories.map((category, index) => {
          // Tìm sản phẩm đầu tiên có category._id trùng với category._id hiện tại
          const productInCategory = products.find(
            (product) => product.category._id === category._id
          );
          // Đặt đường dẫn hình ảnh nếu tìm thấy sản phẩm, nếu không sẽ là hình mặc định
          const imageSrc =
            productInCategory && productInCategory.items[0].image.mediaFilePath
              ? productInCategory.items[0].image.mediaFilePath
              : `/images/dm_${index + 1}.jpg`;

          return (
            <div className="col-md-3" key={category._id}>
              <Link
                href={`/danh-muc/${category._id}`}
                className="card text-bg-dark"
              >
                <img
                  alt={category.name}
                  className="card-img"
                  src={imageSrc} // Hiển thị hình ảnh lấy được
                />
                <div className="card-img-overlay">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
