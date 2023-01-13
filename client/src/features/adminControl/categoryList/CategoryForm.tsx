import { message } from "antd";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Spinner from "../../../components/spinner/Spinner";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from "../../../services/api/review/category";
import { reviewApi } from "../../../services/api/review/review";
import { Category } from "../../../types/api";

let validationSchema = Yup.object({
  category: Yup.string().required("*review category  is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const CategoryForm = ({
  currentCategory,
  setCategory,
}: {
  currentCategory: Category | undefined;
  setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
}) => {
  const initialValues: FormValues = {
    category: currentCategory?.name || "",
  };
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [editCategory, { isLoading: editCategoryLoading }] =
    useEditCategoryMutation();
  const dispatch = useAppDispatch();
  const {t} =useTranslation()
  
  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    if (!currentCategory) {
      createCategory({ name: data.category })
        .unwrap()
        .then((data) => {
          message.success(t('p96'));
          resetForm();
        })
        .catch((err) => {
          message.error(t('p31'));
        });
    } else {
      editCategory({ name: data.category, _id: currentCategory._id })
        .unwrap()
        .then((data) => {
          message.success(t('p97'));
          resetForm();
          setCategory(undefined);
          dispatch(
            reviewApi.util.invalidateTags([{ type: "Review", id: "LIST" }])
          );
        })
        .catch((err) => {
          message.error(t('p31'));
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <>
            {isLoading || editCategoryLoading ? (
              <Spinner isLoading={isLoading} />
            ) : (
              ""
            )}

            <Form className="w-[100%] relative">
              {currentCategory ? (
                <span
                  className="absolute right-0 top-4 cursor-pointer"
                  onClick={() => setCategory(undefined)}
                >
                  X
                </span>
              ) : (
                ""
              )}
              <Field
                name="category"
                type="text"
                className={`text-center border-b dark:bg-zinc-800 outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider ${
                  formik.touched.category && formik.errors.category
                    ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
                    : ""
                }`}
                placeholder={
                  formik.touched.category && formik.errors.category
                    ? formik.errors.category
                    : currentCategory
                    ? t('p94')
                    : t('p93')
                }
              />
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
