"use client";
import CustomEditor from "@/app/components/custom-editor";
import { updatePost, getPostById } from "@/app/databases/post";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import MediaModal from "../../../san-pham/components/mediaModal";
import Overlay from "@/app/components/overlay";

export default function EditPost({ params }) {
  const { id } = params; // Lấy id từ URL

  const [postData, setPostData] = useState(null); // Dữ liệu bài viết
  const [postDescription, setPostDescription] = useState(""); // Mô tả bài viết
  const [showMedia, setShowMedia] = useState(false);
  const [image, setImage] = useState(null);

  // Lấy thông tin bài viết khi trang tải
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await getPostById(id); // Gọi API lấy bài viết

          setPostData(post);
          setPostDescription(post.content); // Cập nhật mô tả bài viết
          setImage(post.image); // Cập nhật hình ảnh
        } catch (error) {
          console.error("Lỗi khi lấy bài viết:", error);
          toast.error("Không thể lấy thông tin bài viết!");
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSelectMedia = (media) => {
    console.log("Selected media:", media);
    setImage(media);
    setShowMedia(false);
  };

  const handleCloseModal = () => {
    setShowMedia(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postTitle = event.target.postTitle.value;

    if (!postTitle || !postDescription) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const postDataToUpdate = {
      title: postTitle,
      image: image._id,
      content: postDescription,
    };

    try {
      const result = await updatePost(id, postDataToUpdate);
      toast.success("Cập nhật bài viết thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      toast.error("Có lỗi xảy ra khi cập nhật bài viết!");
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
        <h1>Chỉnh Sửa Bài Viết</h1>

        {postData ? (
          <div className="row">
            <div className="col-9">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    defaultValue={postData.title}
                    placeholder="Tên bài viết"
                    required
                  />
                  <label htmlFor="postTitle">Tiêu đề</label>
                </div>

                <div className="mb-3 bg-white p-3">
                  <label htmlFor="postDescription" className="fw-bold">
                    Nội dung
                  </label>
                  <CustomEditor
                    value={postDescription}
                    onChange={(value) => setPostDescription(value)}
                    placeholder="Nhập nội dung bài viết"
                  />
                </div>

                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      Cập Nhật Bài Viết
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3">
              <span>Thumbnail</span>
              <div className="image-container w-100 position-relative">
                <img
                  id="image-item"
                  src={image.filePath || "/images/image-select.png"}
                  alt="Selected media"
                  className="img-thumbnail w-100 rounded"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div
                  className={"hover-overlay"}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                  onClick={() => {
                    setShowMedia(true);
                  }}
                >
                  <span className="hover-text fs-4 text-white fw-bold">
                    Chọn hình ảnh
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Đang tải dữ liệu bài viết...</p>
        )}
      </div>
    </>
  );
}
