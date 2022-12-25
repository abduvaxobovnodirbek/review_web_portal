import { Field } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextEditor_Formats, TextEditor_Modules } from "./TextEditorConfigs";

const TextEditor = () => {
  return (
    <Field name="description">
      {({ field }) => (
        <ReactQuill
          theme="snow"
          value={field.value}
          onChange={field.onChange(field.name)}
          modules={TextEditor.modules}
          formats={TextEditor.formats}
          placeholder={"Write something ..."}
          className="ql-editor"
        />
      )}
    </Field>
  );
};

TextEditor.modules = TextEditor_Modules;
TextEditor.formats = TextEditor_Formats;

export default TextEditor;
