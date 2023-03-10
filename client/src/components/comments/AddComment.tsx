import { Field } from "formik";
import { useTranslation } from "react-i18next";

const AddComment = ({ formik }: { formik: any }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-4">
      <div className="mb-2">
        <label htmlFor="comment" className="text-lg text-gray-600">
          {t("p47")}
        </label>
        <Field
          as="textarea"
          className={`w-full h-20 p-2 dark:bg-zinc-700 dark:text-white border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 ${
            formik.touched.text && formik.errors.text
              ? " placeholder:text-red-500 placeholder:text-sm  dark:text-gray-300 italic border-red-500 focus:border-red-500"
              : ""
          }`}
          name="text"
          placeholder={
            formik.touched.text && formik.errors.text
              ? formik.errors.text
              : t("p47") || ""
          }
        ></Field>
      </div>
      <button
        disabled={!formik.isValid}
        type="submit"
        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
      >
        {t("p1")}
      </button>
    </div>
  );
};

export default AddComment;
