"use client";
import "../../style.css";
import { useEffect, useState } from "react";
import MediaModal from "../../components/mediaModal"; // Import component MediaModal
import { getAllCategories } from "@/app/databases/categories";
import { getAllColors } from "@/app/databases/color";
import { getAllSizes } from "@/app/databases/size";
import { getProductById, updateProduct } from "@/app/databases/products";
import { ToastContainer, toast } from "react-toastify"; // Import toast\
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/app/components/custom-editor"), {
  ssr: false,
});

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

  const handleAddVariation = (itemIndex) => {
    const newItems = [...items];
    newItems[itemIndex].variations.push({
      size: listSizes[0]._id,
      quantity: 0,
    });
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        color: listColors[0]._id,
        image: "",
        price: "",
        discount: 0,
        variations: [{ size: listSizes[0]._id, quantity: 0 }],
      },
    ]);
  };

  const handleRemoveItem = (itemIndex) => {
    const targetVariations = items[itemIndex].variations;

    // Kiểm tra nếu có variation nào có quantity > 0
    const hasQuantity = targetVariations.some(
      (variation) => variation.quantity > 0
    );
    if (hasQuantity) {
      toast.error("Không thể xóa khi còn số lượng !");
      return;
    }
    if (items.length <= 1) {
      toast.warning("Mỗi sản phẩm phải có ít nhất một màu");
      return;
    }
    // Lọc items để loại bỏ phần tử theo itemIndex
    const newItems = items.filter((_, index) => index !== itemIndex);
    setItems(newItems);

    // Lọc imageFilePath để loại bỏ phần tử tương ứng
    const newImageFilePath = imageFilePath.filter(
      (_, index) => index !== itemIndex
    );
    setImageFilePath(newImageFilePath);
  };

  const handleRemoveVariation = (itemIndex, variationIndex) => {
    const targetVariation = items[itemIndex].variations[variationIndex];

    // Kiểm tra số lượng lớn hơn 0
    if (targetVariation.quantity > 0) {
      toast.error("Không thể xóa khi còn số lượng !");
      return;
    }

    if (items[itemIndex].variations.length <= 1) {
      toast.warning("Mỗi màu phải có ít nhất một size!");
      return;
    }
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
    try {
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
    } catch (error) {
      throw new Error("Lỗi Update Sản Phẩm", error);
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
          <div className="mb-3 bg-white p-3">
            <label htmlFor="productDescription" className="fw-bold">
              Mô tả sản phẩm
            </label>
            <CustomEditor
              value={product.description}
              onChange={(content) =>
                setProduct({ ...product, description: content })
              }
            />
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
                <h5>Màu Sắc {itemIndex + 1}</h5>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemoveItem(itemIndex)} // Nút để xóa Màu Sắc
                >
                  Xóa Màu Sắc
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
                          <h6>Kích Thước {variationIndex + 1}</h6>
                          <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() =>
                              handleRemoveVariation(itemIndex, variationIndex)
                            } // Nút để xóa Kích Thước
                          >
                            Xóa Kích Thước
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
                      Thêm Kích Thước
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
            Thêm Màu Sắc
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
