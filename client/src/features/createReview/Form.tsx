import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateReviewMutation } from "../../services/api/review";
import { useAppSelector } from "../../hooks/useAppSelector";
import CreateTags from "./CreateTags/CreateTags";
import ReviewedArticle from "./ReviewedArticle/ReviewedArticle";
import Title from "./Title/Title";
import DemoVisualization from "./Demo/DemoVisualization";
import Image from "./Image/Image";
import Category from "./Category/Category";
import Grade from "../../components/grade/Grade";
import TextEditor from "../../components/Editor/TextEditor";
import { Alert, Stack } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { message, Spin } from "antd";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

let validationSchema = Yup.object({
  review_name: Yup.string().required("*review name  is required"),
  reviewed_art: Yup.string().required("*reviewed piece of art  is required"),
  category: Yup.string().required("*review category  is required"),
  tags: Yup.array()
    .min(1, "*at least 1 tag must be provided")
    .required("*review tag is required"),
  description: Yup.string()
    .min(100)
    .required("*review description is required"),
  authorGrade: Yup.number().required("*author grade is required"),
  imageList: Yup.array(),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const FormComponent = () => {
  const [createReview, { isLoading }] =
    useCreateReviewMutation();

  const initialValues: FormValues = {
    review_name: "",
    description: "",
    reviewed_art: "",
    category: "",
    tags: [],
    authorGrade: 5,
    imageList: [],
  };

  const { width } = useWindowSize();

  const { stepFirst, stepSecond } = useAppSelector(
    (state) => state.reviewSteps
  );

  const navigate = useNavigate()

  const handleSubmit = async (data: FormValues, { resetForm }: any) => {
    const images: string[] = [];
    if (data.imageList) {
      data.imageList.forEach((file: any) => images.push(file.preview));
    }

    await createReview({ ...data, imageList: images })
      .unwrap()
      .then((data) => {
        message.success("Successfully created new review!");
        navigate('/user-profile')
      })
      .catch((err) => {
        console.log(err);
        message.error("something went wrong try again!");
      });
  };

  return (
    <div className={`${width > 1000 ? "w-[75%]" : "w-[90%]"}`}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              {isLoading ? <Spinner isLoading={isLoading} /> : ""}
              {stepFirst ? (
                <>
                  <Title formik={formik} />

                  <TextEditor
                    displayMode="EDIT"
                    formik={formik}
                    createReview={true}
                  />
                </>
              ) : stepSecond ? (
                <div className={`${width > 1000 ? "w-[70%]" : "w-[100%]"}`}>
                  <ReviewedArticle formik={formik} />
                  <CreateTags formik={formik} />
                  <Category formik={formik} />
                  <Grade
                    formik={formik}
                    createReview={true}
                    defaultValue={formik.values.authorGrade}
                    disabled={false}
                    authorGrade={true}
                    labelText="Author Grade:"
                    count={10}
                  />

                  <Image formik={formik} />
                </div>
              ) : (
                <div className="max-w-[750px] mx-auto">
                  {Object.values(formik.errors).length ||
                  !formik.values.description ? (
                    <>
                      <header
                        className="font-serif tracking-wider p-3 text-white"
                        style={{ background: "#f6f6f6", color: "red" }}
                      >
                        Please step back and fill the required form
                      </header>
                      <Stack
                        sx={{ width: "100%", marginTop: "35px" }}
                        spacing={2}
                      >
                        {Object.values(formik.errors).map(
                          (errName: any, i: number) => {
                            return (
                              <Alert severity="error" key={i}>
                                {errName}
                              </Alert>
                            );
                          }
                        )}
                      </Stack>
                    </>
                  ) : (
                    <DemoVisualization formik={formik} />
                  )}
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
