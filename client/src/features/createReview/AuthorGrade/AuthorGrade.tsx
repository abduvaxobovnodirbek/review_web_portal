import { Rate } from "antd";

type gradeProps = {
  formik: any;
  viewer: boolean;
};
const AuthorGrade = ({ formik, viewer }: gradeProps) => {
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
        disabled={viewer}
        defaultValue={formik.values.authorGrade}
        onChange={(e) => formik.setFieldValue("authorGrade", e)}
        className={`text-3xl ${!viewer ? "border-b" : ""} pb-2 w-[100%] mt-2`}
      />
    </div>
  );
};

export default AuthorGrade;
