"use client";

import Media from "../../media/page";
import "../style.css";

export default function MediaModal({ onSelectMedia, onClose }) {
  const handleSelectMedia = (data) => {
    onSelectMedia(data); // Gọi hàm từ component cha nữa (AddProduct)
  };
  return (
    <>
      <div
        className="position-fixed w-100 p-3 "
        role="mediaModal"
        style={{
          top: "0",
          left: "0",
          zIndex: 1000,
        }}
      >
        <div className="w-100 bg-white shadow-lg d-flex flex-wrap p-2">
          <div className="fs-4 w-100">
            <div className="fs-3 float-start">Hình ảnh</div>
            <button className="float-end" onClick={onClose}>
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="w-100">
            <Media handleSelectMedia={handleSelectMedia}></Media>
          </div>
        </div>
      </div>
    </>
  );
}
