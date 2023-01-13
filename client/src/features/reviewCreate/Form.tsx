import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { message } from "antd";
import * as Yup from "yup";
import { Alert, Stack } from "@mui/material";
import { useCreateReviewMutation } from "../../services/api/review/review";
import { useAppSelector } from "../../hooks/useAppSelector";
import CreateTags from "./CreateTags/CreateTags";
import ReviewedArticle from "./ReviewedArticle/ReviewedArticle";
import Title from "./Title/Title";
import DemoVisualization from "./Demo/DemoVisualization";
import Image from "./Image/Image";
import Category from "./Category/Category";
import Grade from "../../components/grade/Grade";
import TextEditor from "../../components/Editor/TextEditor";
import useWindowSize from "../../hooks/useWindowSize";
import Spinner from "../../components/spinner/Spinner";

const FormComponent = () => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { t } = useTranslation();

  let validationSchema = Yup.object({
    review_name: Yup.string().required(t("p56") || ""),
    reviewed_art: Yup.string().required(t("p57") || ""),
    category: Yup.string().required(t("p58") || ""),
    tags: Yup.array()
      .min(1, t("p59") || "")
      .required(t("p60") || ""),
    description: Yup.string()
      .min(100)
      .required(t("p61") || ""),
    authorGrade: Yup.number().required(t("p62") || ""),
    imageList: Yup.array(),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

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

  const navigate = useNavigate();

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    const images: string[] = [];
    if (data.imageList) {
      data.imageList.forEach((file: any) => images.push(file.preview));
    }

    createReview({ ...data, imageList: images })
      .unwrap()
      .then((data) => {
        message.success(t("p107"));
        navigate("/profile");
      })
      .catch((err) => {
        message.error(t('p31'));
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
                    labelText={t("p68") || ""}
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
                        className="font-serif tracking-wider p-3 text-white dark:!bg-zinc-800"
                        style={{ background: "#f6f6f6", color: "red" }}
                      >
                        {t("p69")}
                      </header>
                      <Stack
                        sx={{ width: "100%", marginTop: "35px" }}
                        spacing={2}
                      >
                        {Object.values(formik.errors).map(
                          (errName: any, i: number) => {
                            return (
                              <Alert
                                severity="error"
                                key={i}
                                className="dark:!bg-zinc-800 dark:text-red-600"
                              >
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
