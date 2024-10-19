const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const insert = async (body) => {
  try {
    const response = await fetch(`${apiUrl}/address/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Chuyển đối tượng body thành JSON
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Trả về dữ liệu kết quả từ backend
  } catch (error) {
    console.error("Lỗi khi gọi API insert: ", error);
    throw error; // Có thể ném lỗi để xử lý bên ngoài hàm này nếu cần
  }
};
const getAllByUserId = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/address/user/${userId}`); // Gọi API

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách địa chỉ");
    }

    const result = await response.json(); // Phân tích dữ liệu JSON
    return result; // Trả về danh sách địa chỉ
  } catch (error) {
    console.error("Lỗi:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác
  }
};
async function deleteById(id) {
  try {
    // Gửi yêu cầu xóa đến API
    const response = await fetch(`${apiUrl}/address/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra xem yêu cầu có thành công không
    if (!response.ok) {
      throw new Error("Không thể xóa địa chỉ.");
    }

    // Nếu thành công, trả về một thông điệp hoặc bất kỳ dữ liệu nào nếu cần
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi xóa địa chỉ:", error);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm
  }
}
async function getById(id) {
  try {
    const response = await fetch(`${apiUrl}/address/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const addressData = await response.json();
    return addressData;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy địa chỉ:", error);
    throw error; // ném lại lỗi để xử lý ở nơi gọi hàm này nếu cần
  }
}
async function updateById(id, body) {
  try {
    const response = await fetch(`${apiUrl}/address/${id}`, {
      method: "POST", // hoặc 'PATCH' nếu bạn chỉ muốn cập nhật một số trường
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Nếu không phải là mã trạng thái thành công, ném lỗi
      throw new Error(`Error: ${response.statusText}`);
    }

    const updatedAddress = await response.json();
    return updatedAddress; // Trả về địa chỉ đã được cập nhật
  } catch (error) {
    console.error("Error updating address:", error);
    throw error; // Ném lỗi lên để xử lý ở nơi khác nếu cần
  }
}

export { insert, getAllByUserId, deleteById, getById, updateById };
