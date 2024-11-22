import Link from "next/link";
import React, { useEffect, useState } from "react";
import { parseJwt } from "../databases/users";
import { getCookie } from "../lib/CookieManager";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  fetchCartByUserId,
} from "../../../redux/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function ProductCard({ product, col }) {
  let listCarts = useSelector((state) => state.cart.items);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});
  const [selectedItem, setSelectedItem] = useState(product.items?.[0]); // Khởi tạo item được chọn là item đầu tiên
  const [selectedColorId, setSelectedColorId] = useState(
    selectedItem.color._id
  ); // Khởi tạo màu đã chọn
  const fetchCarts = async (userId) => {
    const result = await dispatch(fetchCartByUserId(userId));
    listCarts = result;
  };

  useEffect(() => {
    const token = getCookie("LOGIN_INFO");
    if (token) {
      setPayload(parseJwt(token));
    }
  }, []);

  // Hàm xử lý khi chọn màu
  const handleItemSelect = (item) => {
    setSelectedItem(item); // Cập nhật item được chọn
    setSelectedColorId(item.color._id); // Cập nhật màu đã chọn
    console.log("this is item: ", item);
  };

  // console.log(selectedItem);
  const discountedPrice =
    selectedItem.price * (1 - selectedItem.discount / 100);

  const canAddToCart = (newCartItem, listCarts, maxQuantity) => {
    const currentQuantityInCart = listCarts.reduce((total, cartItem) => {
      const isSameProduct = cartItem.product._id === newCartItem.product._id;
      const isSameVariation =
        cartItem.product.items._id === newCartItem.product.items._id &&
        cartItem.product.items.variations._id ===
          newCartItem.product.items.variations._id;
      if (isSameProduct && isSameVariation) {
        return total + cartItem.product.quantity;
      }
      return total;
    }, 0);

    return currentQuantityInCart + newCartItem.product.quantity <= maxQuantity;
  };

  const handleVariationSelect = (variation) => {
    if (payload && payload._id) {
      fetchCarts(payload._id);
      const newCartItem = {
        user: { _id: payload._id },
        product: {
          _id: product._id,
          name: product.name,
          description: product.description,
          category: product.category,
          items: {
            _id: selectedItem._id, // Lấy item đã chọn từ selectedItem
            color: {
              _id: selectedItem.color._id,
              colorName: selectedItem.color.colorName,
              colorHexCode: selectedItem.color.colorHexCode,
            },
            image: {
              _id: selectedItem.image._id,
              mediaFilePath: selectedItem.image.mediaFilePath,
            },
            price: selectedItem.price,
            discount: selectedItem.discount,
            variations: {
              _id: variation._id, // Variation đã chọn
              size: {
                _id: variation.size._id,
                sizeName: variation.size.sizeName,
                sizeValue: variation.size.sizeValue,
              },
            },
          },
          quantity: 1, // Giả sử quantity là 1, có thể thay đổi tùy vào yêu cầu
        },
      };
      const maxQuantity = variation.quantity;

      // Kiểm tra xem có thể thêm sản phẩm vào giỏ hàng hay không
      if (canAddToCart(newCartItem, listCarts, maxQuantity)) {
        // const result = await addToCart(newCartItem);
        const result = dispatch(addProductToCart(newCartItem));
        if (result) {
          fetchCarts(payload._id); // Cập nhật giỏ hàng sau khi thêm thành công
          toast.success("Thêm giỏ hàng thành công!", {
            position: "top-center",
          });
        } else {
          toast.error("Thêm giỏ hàng thất bại!");
        }
      } else {
        // Nếu vượt quá số lượng tối đa, hiển thị thông báo lỗi
        toast.error(
          `Không thể thêm vào giỏ hàng! Bạn đã có ${maxQuantity} sản phẩm trong giỏ hàng với biến thể này.`,
          {
            position: "top-center",
          }
        );
      }

      console.log("New Cart Item: ", newCartItem); // Log ra newCartItem
    } else {
      // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      window.location.href = `/buyer/dang-nhap?next=${pathname}`;
    }
  };

  return (
    <div className={`col-sm-${col} col-6 mb-3`}>
      <div className="card h-100">
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
              {selectedItem.variations
                .filter((variation) => variation.quantity > 0) // Lọc các variation có quantity > 0
                .map((variation, index) => (
                  <button
                    key={index}
                    className="my-size-items"
                    onClick={() => handleVariationSelect(variation)}
                  >
                    {/* Hiển thị tên kích thước */}
                    {variation.size.sizeName}
                    {/* Nếu cần có thể thêm các thuộc tính khác */}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="d-flex">
            {product.items.map((item, index) => (
              <div key={index} className="me-2">
                <span
                  className={`color-indicator mb-1   border ${
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
            <div className="card-title fs-6 text-truncate">{product.name}</div>
          </Link>
          <div className="card-text fs-6 d-flex gap-1 align-items-center">
            <span className="fw-bold">
              {discountedPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            {selectedItem.discount > 0 && (
              <div className="badge bg-primary">- {selectedItem.discount}%</div>
            )}
            {selectedItem.discount > 0 && (
              <del>
                {selectedItem.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </del>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
