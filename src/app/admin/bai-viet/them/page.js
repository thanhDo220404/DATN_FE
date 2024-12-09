"use client";
import CustomEditor from "@/app/components/custom-editor";
import { addPost } from "@/app/databases/post";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MediaModal from "../../san-pham/components/mediaModal";
import Overlay from "@/app/components/overlay";

export default function AddPost() {
  const [postDescription, setPostDescription] = useState(""); // State cho mô tả bài viết
  const [showMedia, setShowMedia] = useState(false);
  const [image, setImage] = useState({});

  const handleSelectMedia = (media) => {
    console.log("Selected media:", media);
    setImage(media);

    setShowMedia(false); // Đóng modal sau khi chọn
  };

  const handleCloseModal = () => {
    setShowMedia(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy dữ liệu từ form
    const postTitle = event.target.postTitle.value; // Tiêu đề bài viết

    // Kiểm tra dữ liệu có hợp lệ không (ở đây bạn cần làm theo yêu cầu của mình)
    if (!postTitle || !postDescription) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return; // Dừng việc gửi form nếu thiếu thông tin
    }

    // Dữ liệu bài viết
    const postData = {
      title: postTitle, // Tiêu đề bài viết
      image: image._id,
      content: postDescription, // Nội dung bài viết
    };

    try {
      // Gọi API để thêm bài viết
      const result = await addPost(postData);

      // Chuyển hướng tới trang sửa bài viết sau khi thêm mới
      window.location.replace(`/admin/bai-viet/sua/${result._id}`);
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      toast.error("Có lỗi xảy ra khi thêm bài viết!");
    }
  };

  return (
    <>
      <ToastContainer />
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
        <h1>Thêm Bài Viết Mới</h1>
        <div className="row">
          <div className="col-9">
            <form onSubmit={handleSubmit}>
              {/* Tiêu đề bài viết */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="postTitle"
                  placeholder="Tên bài viết"
                  required
                />
                <label htmlFor="postTitle">Tiêu đề</label>
              </div>

              {/* Nội dung bài viết */}
              <div className="mb-3 bg-white p-3">
                <label htmlFor="postDescription" className="fw-bold">
                  Nội dung
                </label>
                <CustomEditor
                  value={postDescription}
                  onChange={(value) => setPostDescription(value)} // Cập nhật giá trị description
                  placeholder="Nhập nội dung bài viết"
                />
              </div>

              {/* Nút Lưu bài viết */}
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    Lưu Bài Viết
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3">
            <span>Thumbnail</span>
            <div className="image-container w-100">
              <img
                id={`image-item`}
                src={image.filePath || "/images/image-select.png"}
                alt="Selected media"
                className="img-fluid img-thumbnail"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div
                className={`hover-overlay ${
                  !image?.filePath ? "opacity-100" : ""
                }`}
                onClick={() => {
                  setShowMedia(true); // Mở modal media
                }}
              >
                <span className="hover-text fs-3">Chọn hình ảnh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
