import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import { message } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useAppSelector } from "../../hooks/useAppSelector";
import Spinner from "../../components/spinner/Spinner";
import Title from "../reviewCreate/Title/Title";
import TextEditor from "../../components/Editor/TextEditor";
import CreateTags from "../reviewCreate/CreateTags/CreateTags";
import Category from "../reviewCreate/Category/Category";
import Grade from "../../components/grade/Grade";
import Image from "../reviewCreate/Image/Image";
import DemoVisualization from "../reviewCreate/Demo/DemoVisualization";
import ReviewedArticle from "../reviewCreate/ReviewedArticle/ReviewedArticle";
import useWindowSize from "../../hooks/useWindowSize";
import { ReviewDetail } from "../../types/api";
import { useEditReviewMutation } from "../../services/api/review/review";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { adminControlApi } from "../../services/api/admin/admin";


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

const EditForm = ({
  review,
  setShowEditForm,
}: {
  review: ReviewDetail | undefined;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialValues: FormValues = {
    review_name: review?.review_name || "",
    description: review?.description || "",
    reviewed_art: review?.reviewed_art || "",
    category: review?.category._id || "",
    tags: review?.tags || [],
    authorGrade: review?.authorGrade || 1,
    imageList: [],
  };
  const [editReview, { isLoading }] = useEditReviewMutation();
  const { currentUser } = useAppSelector((state) => state.users);
  const location = useLocation();
  const { width } = useWindowSize();
  const {t} = useTranslation()
  const { stepFirst, stepSecond } = useAppSelector(
    (state) => state.reviewSteps
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    const images: string[] = [];
    if (data.imageList) {
      data.imageList.forEach((file: any) => {
        images.push(file.preview);
      });
    }

    editReview({
      ...data,
      imageList: images,
      review_id: review?._id || "",
      userId: review?.user._id || currentUser?._id || "",
    })
      .unwrap()
      .then((data) => {
        message.success(t('p108'));
        if (location.pathname !== "/admin/panel") {
          navigate("/profile");
        } else {
          dispatch(
            adminControlApi.util.invalidateTags([
              { type: "Reviews", id: "LIST" },
            ])
          );
          setShowEditForm(false);
        }
      })
      .catch((err) => {
        message.error(t('p31'));
      });
  };

  return (
    <div className={`${width > 1000 ? "w-[75%]" : "w-[90%]"}`}>
      <div
        className="flex items-center  absolute right-12 top-24 shadow-sm p-2 cursor-pointer"
        onClick={() => setShowEditForm(false)}
      >
        <MdOutlineArrowBackIos />{" "}
        <span className="ml-2 font-serif text-blue-900 z-50">
          back to reviews table
        </span>
      </div>
      <>
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
                      <DemoVisualization formik={formik} review={review} />
                    )}
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </>
    </div>
  );
};

export default EditForm;
