"use client";

import { insertMedia, getAllMedia } from "@/app/databases/media";
import { useEffect, useState } from "react";
import "../style.css";

export default function MediaModal({ onSelectMedia, onClose }) {
  const [dataMedia, setDataMedia] = useState([]);
  const [dataOneMedia, setDataOneMedia] = useState({});

  // Hàm xử lý khi chọn file
  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);

    // Gọi hàm upload để gửi các file lên server
    try {
      const uploadResponses = await Promise.all(files.map(insertMedia));
      console.log("Kết quả upload:", uploadResponses);
      fetchMedia(); // Lấy danh sách media mới sau khi upload
    } catch (error) {
      console.error("Lỗi khi upload file:", error);
    }
  };

  const handleSetDataOneMedia = (data) => {
    setDataOneMedia(data);
    if (onSelectMedia) {
      onSelectMedia(data); // Gọi hàm từ component cha (AddProduct)
    }
  };

  // Hàm lấy danh sách media
  const fetchMedia = async () => {
    const result = await getAllMedia();
    setDataMedia(result);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  console.log("This is one media data", dataOneMedia);

  return (
    <div className="position-relative">
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-25"
        style={{ zIndex: 200 }}
        onClick={onClose}
      ></div>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 p-4"
        role="mediaModal"
        style={{
          top: "0",
          left: "0",
          zIndex: 1000,
        }}
      >
        <div className="w-100 h-100 m-auto bg-white shadow-lg d-flex flex-wrap p-2  overflow-scroll">
          {/* Header */}
          <div className="fs-4 w-100">
            <div className="fs-3 float-start">Hình ảnh</div>
            <button className="float-end" onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Nút thêm hình */}
          <div className="d-flex w-100">
            <input
              className="d-none"
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileSelect}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Thêm hình
            </button>
          </div>

          {/* Khu vực hiển thị danh sách media */}
          <div>
            {dataMedia.length > 0 ? (
              <div className="d-flex flex-wrap">
                {dataMedia.map((media, index) => (
                  <div
                    key={index}
                    className="media-item mx-1"
                    style={{ width: "150px", height: "150px" }}
                    onClick={() => handleSetDataOneMedia(media)}
                  >
                    <img
                      src={media.filePath} // Đường dẫn tới file ảnh
                      alt={media.fileName}
                      className="img-thumbnail"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Đảm bảo ảnh được bao phủ hết khung
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="m-auto fs-1 text-primary"
                style={{ height: "500px" }}
              >
                Chưa có media nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
