"use client";
import "../../style.css";
import { useEffect, useState } from "react";
import MediaModal from "../../components/mediaModal"; // Import component MediaModal
import Overlay from "@/app/components/overlay";
import { getAllCategories } from "@/app/databases/categories";
import { getAllColors } from "@/app/databases/color";
import { getAllSizes } from "@/app/databases/size";
import { getProductById, updateProduct } from "@/app/databases/products";
import { ToastContainer, toast } from "react-toastify"; // Import toast

export default function UpdateProduct({ params }) {
  const { id } = params; // Lấy ID từ router
  const [currentItemIndex, setCurrentItemIndex] = useState(null); // Theo dõi item nào đang được chọn
  const [showMedia, setShowMedia] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [listColors, setListColors] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [imageFilePath, setImageFilePath] = useState([]);
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
  });

  // Lấy dữ liệu danh mục, màu sắc và kích thước
  const fetchCategories = async () => {
    const result = await getAllCategories();
    setListCategories(result);
  };

  const fetchColor = async () => {
    const result = await getAllColors();
    setListColors(result);
  };

  const fetchSize = async () => {
    const result = await getAllSizes();
    setListSizes(result);
  };

  // Lấy thông tin sản phẩm theo ID
  const fetchProduct = async () => {
    if (id) {
      const result = await getProductById(id);
      if (result === null) {
        window.location.href = "/admin/san-pham";
      }
      setProduct(result.product);
      setItems(result.product.items); // Lưu trữ items từ sản phẩm
      setImageFilePath(
        result.product.items.map((item) => item.image.mediaFilePath)
      ); // Lưu filePath cho hình ảnh
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchColor();
    fetchSize();
    fetchProduct();
  }, [id]);
  console.log(product);

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

  const handleRemoveItem = (itemIndex) => {
    const newItems = items.filter((_, index) => index !== itemIndex);
    setItems(newItems); // Cập nhật trạng thái items
  };

  const handleRemoveVariation = (itemIndex, variationIndex) => {
    const newItems = [...items];
    newItems[itemIndex].variations = newItems[itemIndex].variations.filter(
      (_, index) => index !== variationIndex
    ); // Lọc ra variation không cần xóa
    setItems(newItems); // Cập nhật trạng thái items
  };

  const handleSelectMedia = (media) => {
    const newItems = [...items];
    newItems[currentItemIndex].image = media._id;
    setItems(newItems);
    setImageFilePath((prevPaths) => {
      const newPaths = [...prevPaths];
      newPaths[currentItemIndex] = media.filePath; // Lưu filePath
      return newPaths;
    });
    setShowMedia(false); // Đóng modal sau khi chọn
  };

  const handleCloseModal = () => {
    setShowMedia(false);
  };

  // Hàm xử lý khi nhấn nút Cập Nhật Sản Phẩm
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      name: product.name,
      description: product.description,
      category: product.category,
      items,
    };
    const result = await updateProduct(id, productData); // Gọi hàm updateProduct để cập nhật sản phẩm
    if (result) {
      toast.success("Cập nhật sản phẩm thành công!"); // Hiển thị toast thành công
      // Có thể điều hướng đến trang khác hoặc cập nhật lại dữ liệu
    } else {
      toast.error("Cập nhật sản phẩm thất bại!"); // Hiển thị toast lỗi
    }
  };

  return (
    <>
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      {showMedia && (
        <>
          <MediaModal
            onSelectMedia={handleSelectMedia}
            onClose={handleCloseModal}
          />
          <Overlay onClose={handleCloseModal} />
        </>
      )}
      <div className="container">
        <h1>Cập Nhật Sản Phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Tên sản phẩm"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
            />
            <label htmlFor="productDescription">Mô tả sản phẩm</label>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="productCategory"
              value={product.category._id}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            >
              <option value="" disabled>
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
                        value={item.color._id}
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
                          newItems[itemIndex].price = e.target.value;
                          setItems(newItems);
                        }}
                        required
                      />
                      <label htmlFor={`price-${itemIndex}`}>Giá</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id={`discount-${itemIndex}`}
                        placeholder="Giảm giá"
                        value={item.discount}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[itemIndex].discount = e.target.value; // Cập nhật discount
                          setItems(newItems);
                        }}
                      />
                      <label htmlFor={`discount-${itemIndex}`}>Giảm giá</label>
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
                            value={variation.size._id}
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
                              ].quantity = e.target.value || 0;
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
            className="btn btn-secondary mb-3"
            onClick={handleAddItem}
          >
            Thêm mặt hàng
          </button>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                Cập nhật Sản Phẩm
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
