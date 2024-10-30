"use client";
import "../style.css";
import { useEffect, useState } from "react";
import { getProductById, increaseViewCount } from "@/app/databases/products";
import { getCookie } from "@/app/lib/CookieManager";
import { parseJwt } from "@/app/databases/users";
import { addToCart } from "@/app/databases/cart";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State để lưu item được chọn
  const [selectedVariation, setSelectedVariation] = useState(null); // State để lưu variation được chọn
  const [quantity, setQuantity] = useState(1); // Trạng thái để lưu số lượng
  const [productData, setProductData] = useState({});
  const [payload, setPayload] = useState({});
  const [addToCartData, setAddToCartData] = useState({});

  const fetchProduct = async (id) => {
    const result = await getProductById(id);
    setProduct(result.product);
    const initialItem = result.product.items[0];
    const initialVariation = {
      ...initialItem.variations[0],
      quantity: quantity,
    };

    setSelectedItem(initialItem);
    setSelectedVariation(initialItem.variations[0]);

    // Thiết lập productData dựa trên product nhưng với selectedItem và selectedVariation có quantity là 1
    setProductData({
      ...result.product,
      items: [
        {
          ...initialItem,
          variations: [initialVariation], // Sử dụng selectedVariation với quantity là 1
        },
      ],
    });
  };
  useEffect(() => {
    fetchProduct(id);
    const token = getCookie("LOGIN_INFO");
    if (token) {
      setPayload(parseJwt(token));
    }
  }, [id]);

  const [viewCountIncreased, setViewCountIncreased] = useState(false);
  useEffect(() => {
    // Kiểm tra nếu sản phẩm đã được tải và view count chưa tăng
    if (product && !viewCountIncreased) {
      increaseViewCount(id)
        .then(() => setViewCountIncreased(true))
        .catch((error) => console.error("Error increasing view count:", error));
    }
  }, [product, id, viewCountIncreased]);

  // Kiểm tra xem product đã được tải hay chưa
  if (!product) {
    return (
      <div className="w-100 text-center py-5">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Hoặc có thể hiển thị một loading spinner
  }

  // Hàm xử lý khi chọn màu
  const handleColorSelect = (item) => {
    setSelectedItem(item); // Cập nhật item được chọn
    setSelectedVariation(item.variations[0]); // Cập nhật variation đầu tiên của item
    setQuantity(1); // Đặt lại số lượng về 1
    // Cập nhật productData với selectedItem và selectedVariation
    setProductData((prevData) => ({
      ...prevData,
      items: [
        {
          ...item,
          variations: [
            {
              ...item.variations[0],
              quantity: quantity,
            },
          ],
        },
      ],
    }));
  };
  // Hàm xử lý khi chọn kích thước
  const handleSizeSelect = (variation) => {
    setQuantity(1); // Đặt lại số lượng về 1
    setSelectedVariation(variation); // Gán variation đã chọn

    // Cập nhật productData chỉ với selectedVariation
    setProductData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) => ({
        ...item,
        variations: [
          {
            ...variation,
            quantity: quantity, // Số lượng khởi tạo là 1
          },
        ],
      })),
    }));
  };

  const handleAddToCart = async () => {
    const newCartItem = {
      user: {
        _id: payload._id, // ID của người dùng
      },
      product: {
        _id: productData._id, // ID của sản phẩm
        name: productData.name, // Tên sản phẩm
        description: productData.description, // Mô tả sản phẩm
        category: productData.category, // Thể loại sản phẩm
        items: {
          _id: productData.items[0]._id,
          // Chỉ định item đầu tiên trong productData
          color: {
            _id: productData.items[0].color._id, // ID của màu sắc
            colorName: productData.items[0].color.colorName, // Tên màu sắc
            colorHexCode: productData.items[0].color.colorHexCode, // Mã màu sắc
          },
          image: {
            _id: productData.items[0].image._id, // ID của hình ảnh
            mediaFilePath: productData.items[0].image.mediaFilePath, // Đường dẫn hình ảnh
          },
          price: productData.items[0].price, // Giá sản phẩm
          discount: productData.items[0].discount, // Giảm giá
          variations: {
            id: productData.items[0].variations[0]._id,
            size: {
              _id: productData.items[0].variations[0].size._id, // ID của kích thước
              sizeName: productData.items[0].variations[0].size.sizeName, // Tên kích thước
              sizeValue: productData.items[0].variations[0].size.sizeValue, // Giá trị kích thước
            },
            quantity: quantity, // Số lượng
          },
        },
      },
    };
    const result = await addToCart(newCartItem);
    setAddToCartData(newCartItem); // Cập nhật state với dữ liệu giỏ hàng mới
    console.log(result); // In ra dữ liệu mới để kiểm tra
  };

  // Tính tổng số lượng từ variation đã chọn hoặc từ tất cả các variations
  const totalQuantity = selectedVariation
    ? selectedVariation.quantity // Nếu có variation đã chọn, sử dụng số lượng của nó
    : selectedItem.variations.reduce(
        (total, variation) => total + variation.quantity,
        0
      );
  // console.log("this is product: ", product);
  // console.log("this is item: ", selectedItem);
  // console.log("this is variation: ", selectedVariation);
  console.log("this is productData: ", productData);

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
          <div className="d-flex align-items-center gap-3">
            {selectedItem.discount > 0 ? (
              <>
                <span className="fs-3 fw-bold">
                  {(
                    selectedItem.price -
                    (selectedItem.price * selectedItem.discount) / 100
                  ).toLocaleString("vi-VN")}
                  đ
                </span>
                <span className="badge bg-primary fs-4">
                  - {selectedItem.discount}%
                </span>
                <del className="fs-5">
                  {selectedItem.price.toLocaleString("vi-VN")}đ
                </del>
              </>
            ) : (
              <span className="fs-3 fw-bold">
                {selectedItem.price.toLocaleString("vi-VN")}đ
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
                {selectedItem.variations
                  .filter((variation) => variation.quantity > 0) // Lọc các variation có quantity > 0
                  .map((variation) => (
                    <button
                      key={variation.size._id}
                      className={`my-size-items me-3 ${
                        selectedVariation &&
                        selectedVariation._id === variation._id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        handleSizeSelect(variation);
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
          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={() => handleAddToCart()}
          >
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
