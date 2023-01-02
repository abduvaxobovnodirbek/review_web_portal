import { SetStateAction } from "react";
import parser from "html-react-parser";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { setOptions } from "./TextEditorConfig";
import { textEditorTypes } from "../../types";

const TextEditor = ({
  displayMode,
  formik,
  createReview,
  review,
}: textEditorTypes) => {
  const handleChange = (content: SetStateAction<string>) => {
    if (formik && createReview) {
      formik.setFieldValue("description", content);
    }
  };

  const description = createReview ? formik.values.description : review;
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
            placeholder={
              formik && formik.errors.description
                ? formik.errors.description
                : "type review ..."
            }
            onBlur={() => {
              if (formik) {
                formik.setFieldTouched("description", true);
              }
            }}
          />
        </div>
      ) : (
        <div>
          {description && (
            <div>
              <div className="sun-editor">
                <div className="sun-editor-editable">{parser(description)}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TextEditor;
