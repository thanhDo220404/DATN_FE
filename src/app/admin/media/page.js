"use client";
import { insertMedia, getAllMedia } from "@/app/databases/media";
import { useEffect, useState } from "react";

export default function Media() {
  const [dataMedia, setDataMedia] = useState([]);

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

  // Hàm lấy danh sách media
  const fetchMedia = async () => {
    const result = await getAllMedia();
    setDataMedia(result);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      <div className="py-3">
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
        <div className="rounded bg-white my-3">
          <div className="d-flex flex-wrap">
            {dataMedia.length > 0 ? (
              dataMedia.map((media, index) => (
                <div
                  key={index}
                  className="media-item"
                  style={{ width: "150px", height: "150px" }}
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
              ))
            ) : (
              <div className="text-center fs-1 text-primary">
                Chưa có media nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
