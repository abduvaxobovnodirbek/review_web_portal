import { SetStateAction } from "react";
import parser from "html-react-parser";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { setOptions } from "./TextEditorConfigs";

interface textEditorProps {
  displayMode: string;
  formik: any;
}

const TextEditor = ({ displayMode, formik }: textEditorProps) => {
  const handleChange = (content: SetStateAction<string>) => {
    formik.setFieldValue("description", content);
  };

  const description = formik.values.description

  return (
    <>
      {displayMode === "EDIT" ? (
        <div>
          <SunEditor
            defaultValue={description || undefined}
            onChange={handleChange}
            autoFocus={true}
            lang="en"
            setOptions={setOptions}
          />
        </div>
      ) : (
        <div>
          {description && (
            <div>
              <div className="sun-editor">
                <div className="sun-editor-editable">
                  {parser(description)}
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
