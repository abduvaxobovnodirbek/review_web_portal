import { FC } from "react";
import { Rate } from "antd";

const AuthorGrade: FC = () => {
  return (
    <div className="my-4">
      <label
        htmlFor="authorGrade:"
        className="font-serif text-gray-400 tracking-wider cursor-pointer"
      >
        Author grade:
      </label>
      <Rate
        count={10}
        allowClear={false}
        defaultValue={5}
        className="text-3xl border-b pb-2 w-[100%] mt-2"
      />
    </div>
  );
};

export default AuthorGrade;
