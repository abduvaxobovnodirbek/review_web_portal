import { Select } from "antd";
import type { SelectProps } from "antd";

const CreateTags = ({ formik }: any) => {
  const options: SelectProps["options"] = [];

  const handleChange = (value: string) => {
    console.log(value);
    formik.setFieldValue("tags", value);
  };

  return (
    <>
      <label
        htmlFor="tag"
        className="font-serif text-gray-400 tracking-wider cursor-pointer"
      >
        Tags you defined:
      </label>
      <Select
        mode="tags"
        id="tag"
        style={{ width: "100%" }}
        className="font-serif text-xl tracking-wider pb-3"
        onChange={handleChange}
        tokenSeparators={[","]}
        options={options}
        defaultValue={formik.values.tags}
      />
    </>
  );
};

export default CreateTags;
