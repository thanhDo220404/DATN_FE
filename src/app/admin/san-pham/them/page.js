"use client";
import "../style.css";

import { useEffect, useState } from "react";
import MediaModal from "../components/mediaModal"; // Import component MediaModal
import Overlay from "@/app/components/overlay";
import { getAllCategories } from "@/app/databases/categories";
import { getAllColors } from "@/app/databases/color";
import { getAllSizes } from "@/app/databases/size";
import { insertProduct } from "@/app/databases/products";

export default function AddProduct() {
  const [currentItemIndex, setCurrentItemIndex] = useState(null); // Để theo dõi item nào đang được chọn

  const [showMedia, setShowMedia] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [listColors, setListColors] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [imageFilePath, setImageFilePath] = useState([]);
  const [items, setItems] = useState([
    {
      color: "",
      image: "",
      price: "",
      discount: 0,
      variations: [{ size: "", quantity: 0 }],
    },
  ]);

  const fetchCategories = async () => {
    const result = await getAllCategories(); // Gọi hàm lấy tất cả danh mục
    setListCategories(result);
  };

  const fetchColor = async () => {
    const result = await getAllColors();
    setListColors(result);
  };

  const fetchSize = async () => {
    const result = await getAllSizes(); // Gọi hàm lấy tất cả kích thước
    setListSizes(result);
  };

  useEffect(() => {
    fetchCategories();
    fetchColor();
    fetchSize();
  }, []);

  const handleAddVariation = (itemIndex) => {
    const newItems = [...items];
    newItems[itemIndex].variations.push({ size: "", quantity: 0 });
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        color: "",
        image: "",
        price: "",
        discount: 0,
        variations: [{ size: "", quantity: 0 }],
      },
    ]);
  };

  const handleRemoveVariation = (itemIndex, variationIndex) => {
    const newItems = [...items];
    newItems[itemIndex].variations.splice(variationIndex, 1);
    setItems(newItems);
  };

  const handleRemoveItem = (itemIndex) => {
    const newItems = [...items];
    newItems.splice(itemIndex, 1);
    setItems(newItems);
  };

  const handleSelectMedia = (media) => {
    console.log("Selected media:", media);
    const newItems = [...items];
    newItems[currentItemIndex].image = media._id; // Đặt media._id làm giá trị cho image
    setItems(newItems);
    setImageFilePath((prevPaths) => {
      const newPaths = [...prevPaths];
      newPaths[currentItemIndex] = media.filePath; // Lưu filePath thay vì _id cho ảnh
      return newPaths;
    });

    setShowMedia(false); // Đóng modal sau khi chọn
  };

  const handleCloseModal = () => {
    setShowMedia(false);
  };

  // Hàm xử lý khi nhấn nút Lưu Sản Phẩm
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const productName = event.target.productName.value;
    const productDescription = event.target.productDescription.value;
    const productCategory = event.target.productCategory.value;

    const productData = {
      name: productName,
      description: productDescription,
      category: productCategory,
      items, // Dữ liệu items đã được nhập
    };
    const result = await insertProduct(productData);
    window.location.replace(`/admin/san-pham/sua/${result._id}`);
    console.log("Product Data:", result); // Log dữ liệu sản phẩm ra console
  };

  return (
    <>
      {showMedia ? (
        <>
          <MediaModal
            onSelectMedia={handleSelectMedia}
            onClose={handleCloseModal}
          ></MediaModal>
          <Overlay onClose={handleCloseModal}></Overlay>
        </>
      ) : null}
      <div className="container">
        <h1>Thêm Sản Phẩm Mới</h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Gọi hàm handleSubmit khi submit form */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Tên sản phẩm"
              required
            />
            <label htmlFor="productName">Tên sản phẩm</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="productDescription"
              placeholder="Mô tả sản phẩm"
              rows="3"
              required
            />
            <label htmlFor="productDescription">Mô tả sản phẩm</label>
          </div>
          <div className="form-floating mb-3">
            <select className="form-select" id="productCategory" required>
              <option value="" disabled selected>
                Chọn danh mục
              </option>
              {listCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="productCategory">Danh Mục</label>
          </div>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className="border p-3 mb-3 bg-white">
              <div className="d-flex align-items-center">
                <h5>Mặt Hàng {itemIndex + 1}</h5>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemoveItem(itemIndex)} // Nút để xóa mặt hàng
                >
                  Xóa Mặt Hàng
                </button>
              </div>
              <div className="form-floating mb-3">
                <div className="row">
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id={`color-${itemIndex}`}
                        value={item.color}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[itemIndex].color = e.target.value;
                          setItems(newItems);
                        }}
                        required
                      >
                        <option value="" disabled>
                          Chọn màu sắc
                        </option>
                        {listColors.map((color) => (
                          <option key={color._id} value={color._id}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={`color-${itemIndex}`}>Màu sắc</label>
                    </div>

                    <div className="form-floating mb-3 d-none">
                      <input
                        type="text"
                        className="form-control"
                        id={`image-${itemIndex}`}
                        placeholder="Media ID"
                        value={item.image}
                        required
                      />
                      <label htmlFor={`image-${itemIndex}`}>Media ID</label>

                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={() => {
                          setCurrentItemIndex(itemIndex); // Lưu lại index của item hiện tại
                          setShowMedia(true); // Mở modal media
                        }}
                      >
                        Chọn hình ảnh
                      </button>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id={`price-${itemIndex}`}
                        placeholder="Giá"
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[itemIndex].price = e.target.value; // Cập nhật giá cho item hiện tại
                          setItems(newItems);
                        }}
                        required
                      />
                      <label htmlFor={`price-${itemIndex}`}>Giá</label>
                    </div>

                    {item.variations.map((variation, variationIndex) => (
                      <div key={variationIndex} className="mb-3">
                        <div className="d-flex align-items-center">
                          <h6>Biến thể {variationIndex + 1}</h6>
                          <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() =>
                              handleRemoveVariation(itemIndex, variationIndex)
                            } // Nút để xóa biến thể
                          >
                            Xóa Biến Thể
                          </button>
                        </div>

                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            id={`size-${itemIndex}-${variationIndex}`}
                            value={variation.size}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[itemIndex].variations[
                                variationIndex
                              ].size = e.target.value;
                              setItems(newItems);
                            }}
                            required
                          >
                            <option value="" disabled>
                              Chọn kích thước
                            </option>
                            {listSizes.map((size) => (
                              <option key={size._id} value={size._id}>
                                {size.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor={`size-${itemIndex}-${variationIndex}`}
                          >
                            Kích thước
                          </label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id={`quantity-${itemIndex}-${variationIndex}`}
                            placeholder="Số lượng"
                            value={variation.quantity}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[itemIndex].variations[
                                variationIndex
                              ].quantity = e.target.value || 0; // Cập nhật số lượng
                              setItems(newItems);
                            }}
                            required
                          />
                          <label
                            htmlFor={`quantity-${itemIndex}-${variationIndex}`}
                          >
                            Số lượng
                          </label>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleAddVariation(itemIndex)}
                    >
                      Thêm biến thể
                    </button>
                  </div>
                  <div className="col-6">
                    <div className="image-container w-100">
                      <img
                        id={`image-item-${itemIndex}`}
                        src={
                          imageFilePath[itemIndex] || "/images/image-select.png"
                        }
                        alt="Selected media"
                        className="img-thumbnail w-100 rounded"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <div
                        className="hover-overlay"
                        onClick={() => {
                          setCurrentItemIndex(itemIndex); // Lưu lại index của item hiện tại
                          setShowMedia(true); // Mở modal media
                        }}
                      >
                        <span className="hover-text fs-3">Chọn hình ảnh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddItem}
          >
            Thêm Mặt Hàng
          </button>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                Lưu Sản Phẩm
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
