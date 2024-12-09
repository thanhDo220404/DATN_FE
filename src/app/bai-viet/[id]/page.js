"use client";
import CommentForm from "@/app/components/commentForm";
import { getPostById, getPosts } from "@/app/databases/post";
import { useEffect, useState } from "react";

export default function PostDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch post data by ID
  const fetchPostById = async (id) => {
    try {
      setLoading(true);
      const result = await getPostById(id);
      setPost(result);
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPosts = async () => {
    const result = await getPosts();
    const relatedPosts = result
      .filter((relatedPost) => relatedPost._id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4); // Giới hạn hiển thị 4 sản phẩm
    setPosts(relatedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (!post) {
    return <div>Post not found.</div>; // Show a message if no post is found
  }

  return (
    <>
      <div className="container my-5">
        {/* Bài viết chính */}
        <div className="row g-4">
          {/* Phần bài viết chính */}
          <div className="col-lg-8 main-article" id="maxWidth">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title fs-3 fw-bold">{post.title}</h1>{" "}
                {/* Dynamic title */}
                <p className="card-subtitle text-muted mb-4">
                  {post.createdAt === post.updatedAt ? (
                    <>
                      <strong>Ngày đăng:</strong>{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </>
                  ) : (
                    <>
                      <strong>Cập nhật:</strong>{" "}
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </>
                  )}

                  {/* Dynamic date and author */}
                </p>
                <div
                  id="postContent"
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
                {/* Dynamic content */}
              </div>
            </div>
          </div>

          {/* Phần bài viết mới */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Bài viết mới</h4>
              </div>
              <ul className="list-group list-group-flush">
                {/* Loop through related posts if available */}
                {posts.map((post) => (
                  <li key={post._id} className="list-group-item d-flex">
                    <img
                      src={post.image.filePath} // Assuming related posts have imageUrl
                      alt={post.title}
                      className="me-3 rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p className="mb-1 fw-bold">{post.title}</p>
                      <small className="text-muted">
                        {
                          (post.createdAt = post.updatedAt
                            ? new Date(post.createdAt).toLocaleDateString()
                            : new Date(post.updatedAt).toLocaleDateString())
                        }
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="my-3">
          <CommentForm /> {/* Comment form section */}
        </div>
      </div>
    </>
  );
}
