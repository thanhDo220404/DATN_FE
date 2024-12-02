import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

function CustomEditor({ value, onChange }) {
  const [editorContent, setEditorContent] = useState(value || ""); // Giá trị ban đầu
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContent} // Hiển thị nội dung từ `value`
      config={{
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "link",
            "imageUpload",
            "|",
            "alignment:left",
            "alignment:center",
            "alignment:right",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "insertTable",
            "|",
            "mediaEmbed",
            "|",
            "blockQuote",
            "removeFormat",
          ],
        },
        ckfinder: {
          uploadUrl: "http://localhost:2204/img/", // URL API backend upload
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
          ],
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
      }}
      onChange={(event, editor) => {
        const content = editor.getData(); // Lấy dữ liệu từ editor
        if (onChange) {
          onChange(content); // Gọi hàm onChange được truyền từ props
        }
      }}
    />
  );
}

export default CustomEditor;
