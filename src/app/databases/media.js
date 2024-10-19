export { insertMedia, getAllMedia };
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllMedia = async () => {
  const response = await fetch(`${apiUrl}/media`);
  if (!response.ok) {
    throw new Error("Lỗi khi upload file");
  }

  return await response.json();
};

const insertMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("fileType", file.type);
  formData.append("fileSize", file.size);
  formData.append("filePath", `${apiUrl}/img/media/${file.name}`);

  // // Gọi API upload
  const response = await fetch(`${apiUrl}/media`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Lỗi khi upload file");
  }

  return await response.json();
};
