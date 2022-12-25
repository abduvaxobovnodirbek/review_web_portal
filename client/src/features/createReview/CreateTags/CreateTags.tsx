import { useState, FC } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const CreateTags: FC = () => {
  const options: SelectProps["options"] = [];

  const handleChange = (value: string) => {};

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
      />
    </>
  );
};

export default CreateTags;
