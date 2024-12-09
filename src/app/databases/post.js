const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Không thể lấy danh sách bài viết");
    }
    const data = await response.json();
    return data; // Trả về dữ liệu bài viết
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);

    if (!response.ok) {
      throw new Error("Không thể lấy bài viết");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu bài viết
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addPost = async (newPost) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost), // Dữ liệu bài viết mới
    });

    if (!response.ok) {
      throw new Error("Không thể thêm bài viết mới");
    }

    const data = await response.json();
    return data; // Trả về bài viết mới được tạo
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePost = async (id, updatedPost) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost), // Dữ liệu bài viết đã sửa
    });

    if (!response.ok) {
      throw new Error("Không thể cập nhật bài viết");
    }

    const data = await response.json();
    return data; // Trả về bài viết đã được cập nhật
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Không thể xóa bài viết");
    }

    const data = await response.json();
    return data; // Trả về kết quả sau khi xóa
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getPosts, getPostById, addPost, updatePost, deletePost };
