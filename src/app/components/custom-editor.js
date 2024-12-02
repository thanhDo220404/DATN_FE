import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import translations from "ckeditor5/translations/vi.js";

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
            "insertImage",
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
        ckfinder: {
          uploadUrl: "http://localhost:2204/img/", // URL API backend upload
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
