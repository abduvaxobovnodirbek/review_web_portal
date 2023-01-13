import { message } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { socket } from "../../App";
import AddComment from "../../components/comments/AddComment";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../services/ui/modalSlice";
import { User } from "../../types/api";

let validationSchema = Yup.object({
  text: Yup.string().required("*comment is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const NewCommentForm = ({
  reviewId,
  currentUser,
}: {
  reviewId: string | undefined;
  currentUser: User | null;
}) => {
  const initialValues: FormValues = {
    text: "",
  };

  const dispatch = useAppDispatch();
  const {t} = useTranslation()

  const handleSubmit = async (data: FormValues, { resetForm }: any) => {
    if (currentUser?._id) {
      await socket.emit("send_comment", {
        ...data,
        reviewId: reviewId || "",
        currentUserId: currentUser?._id || "",
      });
      await socket.on("send_comment_result", (result: boolean) => {
        if (!result) {
          return message.error(t('p31'));
        } else {
          message.success(t('p101'));
          resetForm();
        }
      });
    } else {
      dispatch(toggleModal(true));
    }
  };

  return (
    <div className="shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <AddComment formik={formik} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewCommentForm;
