import { Rate } from "antd";
import { gradeType } from "../../types";

const Grade = ({
  formik,
  createReview,
  defaultValue,
  disabled,
  userGrade,
  authorGrade,
  labelText,
  count,
}: gradeType) => {
  const handleChange = (value: number) => {
    if (createReview) {
      formik.setFieldValue("authorGrade", value);
    } else if (userGrade) {
      formik.setFieldValue("userGrade", value);
      formik.submitForm();
    }
  };

  return (
    <div className="my-4">
      <label
        htmlFor="authorGrade:"
        className="font-serif text-gray-400 tracking-wider cursor-pointer"
      >
        {labelText ? labelText : ""}
      </label>
      <Rate
        count={count}
        allowClear={false}
        allowHalf={userGrade ? true : false}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`text-3xl ${
          disabled && authorGrade ? "" : "border-b"
        } pb-2 w-[100%] mt-2`}
      />
    </div>
  );
};

export default Grade;
