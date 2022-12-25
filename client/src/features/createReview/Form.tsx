import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks/useAppSelector";
import AuthorGrade from "./AuthorGrade/AuthorGrade";
import CreateTags from "./CreateTags/CreateTags";
import ReviewedArticle from "./ReviewedArticle/ReviewedArticle";
import TextEditor from "./TextEditor/TextEditor";
import Title from "./Title/Title";
import DemoVisualization from "../../components/review/ReviewDetail";
import Image from "./Image/Image";
import Category from "./Category/Category";

let validationSchema = Yup.object({
  title: Yup.string().required("*review title field is required"),
  description: Yup.string().required("*review description field is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const FormComponent = () => {
  const initialValues: FormValues = { title: "", description: "" };

  const { stepFirst, stepSecond } = useAppSelector(
    (state) => state.reviewSteps
  );

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    console.log(data);
  };

  return (
    <div className="w-[75%]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              {stepFirst ? (
                <>
                  <Title />
                  <TextEditor />
                </>
              ) : stepSecond ? (
                <div className=" w-[70%]">
                  <ReviewedArticle />
                  <CreateTags />
                  <Category />
                  <AuthorGrade />
                  <Image />
                </div>
              ) : (
                <>
                  <DemoVisualization formik={formik} />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormComponent;
