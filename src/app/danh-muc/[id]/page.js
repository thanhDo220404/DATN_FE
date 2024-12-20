"use client";
import "@/app/san-pham/style.css";

import { useEffect, useState } from "react";
import SortColor from "@/app/components/sortColor";
import SortSize from "@/app/components/sortSize";
import { getAllProducts } from "@/app/databases/products";
import { getAllColors } from "@/app/databases/color";
import { getAllSizes } from "@/app/databases/size";
import ProductCard from "@/app/components/productCard";
import { getCategoryById } from "@/app/databases/categories";
import { ToastContainer } from "react-toastify";
import Pagination from "@/app/components/pagination";

export default function Products({ params }) {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // Lưu nhiều màu đã chọn
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Trạng thái cho sắp xếp

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang

  const fetchProducts = async (category_id) => {
    const result = await getAllProducts();
    const filteredProducts = result.filter(
      (product) => product.category._id === category_id
    );
    setProducts(filteredProducts);
  };

  const fetchColors = async () => {
    const result = await getAllColors();
    setColors(result);
  };

  const fetchSizes = async () => {
    const result = await getAllSizes();
    setSizes(result);
  };

  const fetchCategory = async (id) => {
    try {
      const result = await getCategoryById(id);
      setCategory(result);
    } catch (error) {
      console.log(error);
      window.location.href = "/not-found";
    }
  };

  useEffect(() => {
    fetchProducts(id);
    fetchColors();
    fetchSizes();
    fetchCategory(id);
  }, [id]);

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

  // Sắp xếp sản phẩm theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getLowestPrice = (product) => {
      return Math.min(
        ...product.items.map((item) => {
          // Tính giá sau khi áp dụng discount
          const discountedPrice =
            item.price - item.price * (item.discount / 100);
          return discountedPrice;
        })
      );
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

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <div className="container my-5">
        <ToastContainer></ToastContainer>
        <div className="row">
          {category && <h3 className="product-title">{category.name}</h3>}

          <div className="col-3 d-sm-block d-none position-relative py-5">
            <div className="position-sticky top-0">
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
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="col-9">
                <div className="d-flex flex-wrap gap-1">
                  {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                    <>
                      <div className="fs-5 w-100">Đang dùng bộ lọc:</div>
                      {selectedColors.map((color, index) => (
                        <div className="border p-2 me-2 d-flex" key={index}>
                          {color.name}
                          <div
                            className="btn-close"
                            onClick={() => handleColorSelect(color)} // Gọi hàm để xóa màu sắc
                          ></div>
                        </div>
                      ))}
                      {selectedSizes.map((size, index) => (
                        <div className="border p-2 me-2 d-flex" key={index}>
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
                  <option value="">Mặc định</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
            <div className="row featured-products">
              {paginatedProducts.length === 0 ? (
                // Hiển thị 3 placeholder khi không có sản phẩm
                <>
                  <h5 className="fw-bold text-center">
                    Không tìm thấy sản phẩm phù hợp theo yêu cầu của bạn!
                  </h5>
                </>
              ) : (
                <>
                  {paginatedProducts.map((product) => (
                    <ProductCard col={4} key={product._id} product={product} />
                  ))}
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
