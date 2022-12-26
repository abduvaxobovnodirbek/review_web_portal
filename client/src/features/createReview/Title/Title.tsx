import { Field } from "formik";

export default function Title() {
  return (
    <div className="mb-4">
      <Field
        name="review_name"
        type="text"
        className="text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider"
        placeholder="Add a title"
      />
    </div>
  );
}
