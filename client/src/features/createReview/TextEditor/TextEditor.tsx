import { SetStateAction, useState } from "react";
import parser from "html-react-parser";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { setOptions } from "./TextEditorConfigs";

const TextEditor = ({ displayMode }: any) => {
  const [richTextEditor, setRichTextEditor] = useState(
    localStorage.getItem("richText") || ""
  );

  const handleChange = (content: SetStateAction<string>) => {
    localStorage.setItem("richText", content as string);
    setRichTextEditor(content);
  };

  return (
    <>
      {displayMode === "EDIT" ? (
        <div>
          <SunEditor
            defaultValue={richTextEditor || undefined}
            onChange={handleChange}
            autoFocus={true}
            lang="en"
            setOptions={setOptions}
          />
        </div>
      ) : (
        <div>
          {richTextEditor && (
            <div>
              <div className="sun-editor">
                <div className="sun-editor-editable">
                  {parser(richTextEditor)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TextEditor;
