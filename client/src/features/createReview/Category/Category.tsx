import { Field } from "formik";

const Category = ({ formik }: any) => {
  return (
    <div className="mt-3">
      <label
        htmlFor="category"
        className={`font-serif text-gray-400 tracking-wider cursor-pointer ${
          formik.touched.category && formik.errors.category
            ? "text-red-600"
            : ""
        }`}
      >
        {formik.touched.category && formik.errors.category
          ? formik.errors.category
          : "Category:"}
      </label>
      <Field
        as="select"
        name="category"
        id="category"
        className={`font-serif px-2 tracking-wider pb-3  outline-none border-b ${
          formik.touched.category && formik.errors.category
            ? "!border-red-500 "
            : ""
        }`}
        style={{ width: "100%" }}
        onBlur={() => {
          formik.setFieldTouched("category", true);
        }}
      >
        <option value=""></option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
        <option value="film">Film</option>
        <option value="book">Book</option>
      </Field>
    </div>
  );
};

export default Category;
