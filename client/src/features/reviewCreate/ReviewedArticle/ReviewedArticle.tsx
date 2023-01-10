import { Field } from "formik";

const ReviewGroup = ({ formik }: any) => {
  return (
    <>
      <label
        htmlFor="reviewedArticle"
        className={`font-serif text-gray-400 tracking-wider cursor-pointer ${
          formik.touched.reviewed_art && formik.errors.reviewed_art
            ? "text-red-600"
            : ""
        }`}
      >
        {formik.touched.reviewed_art && formik.errors.reviewed_art
          ? formik.errors.reviewed_art
          : "Reviewed piece of art:"}
      </label>

      <div className="mb-4">
        <Field
          id="reviewedArticle"
          name="reviewed_art"
          type="text"
          className={`border-b dark:bg-zinc-800 outline-none w-[100%] focus:border-gray-400 p-3 transition-colors font-serif text-xl tracking-wider ${
            formik.touched.reviewed_art && formik.errors.reviewed_art
              ? " text-red-500  border-red-500 focus:border-red-500"
              : ""
          }
             `}
        />
      </div>
    </>
  );
};

export default ReviewGroup;
