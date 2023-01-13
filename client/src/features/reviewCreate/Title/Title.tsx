import { Field } from "formik";
import { useTranslation } from "react-i18next";

export default function Title({ formik }: any) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <Field
        name="review_name"
        type="text"
        className={`text-center dark:bg-zinc-800 border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider ${
          formik.touched.review_name && formik.errors.review_name
            ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
            : ""
        }`}
        placeholder={
          formik.touched.review_name && formik.errors.review_name
            ? formik.errors.review_name
            : t("p63")
        }
      />
    </div>
  );
}
