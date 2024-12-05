import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRef, useState } from "react";
import translations from "ckeditor5/translations/vi.js";
import MediaModal from "../admin/san-pham/components/mediaModal";

function CustomEditor({ value, onChange }) {
  const [editorContent, setEditorContent] = useState(value || ""); // Giá trị ban đầu
  const [showMedia, setShowMedia] = useState(false);

  const editorRef = useRef(null); // Dùng để tham chiếu editor

  // Hàm chèn hình ảnh vào editor
  const insertImage = (url) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.model.change((writer) => {
        const imageElement = writer.createElement("imageBlock", {
          src: url,
        });
        editor.model.insertContent(
          imageElement,
          editor.model.document.selection
        );
      });
    }
  };

  const handleSelectMedia = (media) => {
    // const newItems = [...items];
    // newItems[currentItemIndex].image = media._id;
    // setItems(newItems);
    // setImageFilePath((prevPaths) => {
    //   const newPaths = [...prevPaths];
    //   newPaths[currentItemIndex] = media.filePath; // Lưu filePath
    //   return newPaths;
    // });
    // console.log(media);
    insertImage(media.filePath);
    setShowMedia(false); // Đóng modal sau khi chọn
  };

  const handleCloseModal = () => {
    setShowMedia(false);
  };

  return (
    <div>
      {showMedia && (
        <>
          <MediaModal
            onSelectMedia={handleSelectMedia}
            onClose={handleCloseModal}
          />
        </>
      )}
      <div className="btn btn-primary" onClick={() => setShowMedia(true)}>
        <i className="bi bi-camera-fill"></i> Thêm hình ảnh
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={editorContent} // Hiển thị nội dung từ `value`
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "showBlocks",
              "|",
              "heading",
              "style",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "link",
              "insertTable",
              "highlight",
              "blockQuote",
              "codeBlock",
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
            ],
          },
          balloonToolbar: [
            "bold",
            "italic",
            "|",
            "link",
            "insertImage",
            "|",
            "bulletedList",
            "numberedList",
          ],
          blockToolbar: [
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "insertImage",
            "insertTable",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
          ],
          fontFamily: {
            supportAllValues: true,
          },
          fontSize: {
            options: [10, 12, 14, "default", 18, 20, 22],
            supportAllValues: true,
          },
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
              {
                model: "heading5",
                view: "h5",
                title: "Heading 5",
                class: "ck-heading_heading5",
              },
              {
                model: "heading6",
                view: "h6",
                title: "Heading 6",
                class: "ck-heading_heading6",
              },
            ],
          },
          htmlSupport: {
            allow: [
              {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true,
              },
            ],
          },
          image: {
            toolbar: [
              "toggleImageCaption",
              "imageTextAlternative",
              "|",
              "imageStyle:inline",
              "imageStyle:wrapText",
              "imageStyle:breakText",
              "|",
              "resizeImage",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
            decorators: {
              toggleDownloadable: {
                mode: "manual",
                label: "Downloadable",
                attributes: {
                  download: "file",
                },
              },
            },
          },
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
          menuBar: {
            isVisible: true,
          },
          style: {
            definitions: [
              {
                name: "Article category",
                element: "h3",
                classes: ["category"],
              },
              {
                name: "Title",
                element: "h2",
                classes: ["document-title"],
              },
              {
                name: "Subtitle",
                element: "h3",
                classes: ["document-subtitle"],
              },
              {
                name: "Info box",
                element: "p",
                classes: ["info-box"],
              },
              {
                name: "Side quote",
                element: "blockquote",
                classes: ["side-quote"],
              },
              {
                name: "Marker",
                element: "span",
                classes: ["marker"],
              },
              {
                name: "Spoiler",
                element: "span",
                classes: ["spoiler"],
              },
              {
                name: "Code (dark)",
                element: "pre",
                classes: ["fancy-code", "fancy-code-dark"],
              },
              {
                name: "Code (bright)",
                element: "pre",
                classes: ["fancy-code", "fancy-code-bright"],
              },
            ],
          },
          translations: [translations],
        }}
        onReady={(editor) => {
          editorRef.current = editor; // Lưu tham chiếu editor
        }}
        onChange={(event, editor) => {
          const content = editor.getData(); // Lấy dữ liệu từ editor
          if (onChange) {
            onChange(content); // Gọi hàm onChange được truyền từ props
          }
        }}
      />
    </div>
  );
}

export default CustomEditor;
