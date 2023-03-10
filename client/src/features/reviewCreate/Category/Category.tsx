import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../../services/api/review/category";

const Category = ({ formik }: any) => {
  const { data } = useGetCategoriesQuery();
  const { t } = useTranslation();
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
          : t("p67")}
      </label>
      <Field
        as="select"
        name="category"
        id="category"
        className={`font-serif dark:bg-zinc-800 px-2 tracking-wider pb-3  outline-none border-b ${
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
        {data &&
          data.map((category, index) => {
            return (
              <option value={category._id} key={index}>
                {category.name}
              </option>
            );
          })}
      </Field>
    </div>
  );
};

export default Category;
