"use client";
import { insertMedia, getAllMedia } from "@/app/databases/media";
import { useEffect, useState } from "react";

export default function Media() {
  const [dataMedia, setDataMedia] = useState([]);
  const [dataOneMedia, setDataOneMedia] = useState({});
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };
  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`; // Byte nếu kích thước dưới 1KB
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`; // KB nếu kích thước dưới 1MB
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`; // MB nếu kích thước từ 1MB trở lên
    }
  };

  // Hàm lấy danh sách media
  const fetchMedia = async () => {
    const result = await getAllMedia();
    setDataMedia(result);
  };

  const handleDelete = async (id) => {};

  useEffect(() => {
    fetchMedia();
  }, []);
  console.log("thís is one media data", dataOneMedia);

  return (
    <>
      {showModal ? (
        <>
          <div className="position-relative w-100 h-100">
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-25"
              style={{ zIndex: 200 }}
            ></div>
            <div
              className="position-fixed top-0 start-0 w-100 h-100 p-4"
              style={{ zIndex: 500 }}
            >
              <div className="w-100 h-100 bg-white p-3">
                <div>
                  <div className="float-start fs-4 mb-3 fw-bold">
                    Chi tiết tệp đính kèm
                  </div>
                  <div className="float-end">
                    <button
                      className="btn-close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8 text-center">
                    <img
                      src={dataOneMedia.filePath}
                      alt={dataOneMedia.fileName}
                      height={600}
                    />
                  </div>
                  <div className="col-4">
                    <p>
                      <span className="fw-bold">Đã tải lên vào lúc:</span>{" "}
                      {formatDate(dataOneMedia.createdAt)}
                    </p>
                    <p>
                      <span className="fw-bold">Tên tệp tin:</span>{" "}
                      {dataOneMedia.fileName}
                    </p>
                    <p>
                      <span className="fw-bold">Loại tệp tin:</span>{" "}
                      {dataOneMedia.fileType}
                    </p>
                    <p>
                      <span className="fw-bold">Dung lượng tệp:</span>{" "}
                      {formatFileSize(dataOneMedia.fileSize)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="p-3">
        <div className="d-flex">
          <h3>Media</h3>
          {/* Input file ẩn */}
          <input
            className="d-none"
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileSelect}
          />

          {/* Nút thêm hình */}
          <button
            className="btn btn-outline-primary ms-3"
            onClick={() => document.getElementById("fileInput").click()} // Kích hoạt click input file
          >
            Thêm hình
          </button>
        </div>

        {/* Khu vực hiển thị danh sách media */}
        <div className="rounded my-3">
          <div className="d-flex flex-wrap">
            {dataMedia.length > 0 ? (
              dataMedia.map((media, index) => (
                <div
                  key={index}
                  className="media-item"
                  style={{ width: "150px", height: "150px" }}
                  onClick={() => handleSetDataOneMedia(media)}
                >
                  <img
                    src={media.filePath} // Đường d ẫn tới file ảnh
                    alt={media.fileName}
                    className="img-thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Đảm bảo ảnh được bao phủ hết khung
                    }}
                  />
                </div>
              ))
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
    </>
  );
}
