import { message } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Grade from "../../components/grade/Grade";
import Spinner from "../../components/spinner/Spinner";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRateReviewMutation } from "../../services/api/review/rating";
import { reviewApi } from "../../services/api/review/review";
import { User } from "../../types/api";

let validationSchema = Yup.object({
  userGrade: Yup.number().required("*user grade is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const GradeForArt = ({
  reviewId,
  currentUser,
  grade,
}: {
  reviewId: string;
  currentUser: User | null;
  grade: number;
}) => {
  const [rateReview, { isLoading }] = useRateReviewMutation();
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const initialValues: FormValues = {
    userGrade: grade,
  };

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    rateReview({ userGrade: Number(data.userGrade), reviewId })
      .unwrap()
      .then(() => {
        message.success(t('p103'));
        dispatch(
          reviewApi.util.invalidateTags([
            { type: "Review", id: "LIST" },
            { type: "ReviewDetail", id: "LIST" },
          ])
        );
      })
      .catch((err) => {
        message.error(t('p31'));
      });
  };

  return (
    <>
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Grade
                formik={formik}
                createReview={false}
                defaultValue={formik.values.userGrade}
                disabled={currentUser?._id ? false : true}
                userGrade={true}
                labelText=""
                count={5}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default GradeForArt;
