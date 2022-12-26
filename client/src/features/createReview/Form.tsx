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
  review_name: Yup.string().required("*review name  is required"),
  reviewed_art: Yup.string().required("*reviewed piece of art  is required"),
  category: Yup.string().required("*review category  is required"),
  tags: Yup.array().min(1).required("*review tag is required"),
  description: Yup.string().required("*review description is required"),
  authorGrade: Yup.number().required("*author grade is required"),
  imageList: Yup.array(),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const FormComponent = () => {
  const initialValues: FormValues = {
    review_name: "",
    description: "",
    reviewed_art: "",
    category: "",
    tags: [],
    authorGrade: 5,
    imageList: [],
  };

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
          console.log(formik.values);
          return (
            <Form>
              {stepFirst ? (
                <>
                  <Title />
                  <TextEditor displayMode="EDIT" formik={formik} />
                </>
              ) : stepSecond ? (
                <div className=" w-[70%]">
                  <ReviewedArticle />
                  <CreateTags formik={formik} />
                  <Category />
                  <AuthorGrade formik={formik} viewer={false} />
                  <Image formik={formik} />
                </div>
              ) : (
                <div>
                  <DemoVisualization formik={formik} />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormComponent;
