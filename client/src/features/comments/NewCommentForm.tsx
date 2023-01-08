import { message } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { socket } from "../../App";
import AddComment from "../../components/comments/AddComment";
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

  const handleSubmit = async (data: FormValues, { resetForm }: any) => {
    await socket.emit("send_comment", {
      ...data,
      reviewId: reviewId || "",
      currentUserId: currentUser?._id || "",
    });
    await socket.on("send_comment_result", (result: boolean) => {
      if (!result) {
        return message.error("Something went wrong try again please!");
      } else {
        message.success("you have successfuly commented!");
        resetForm();
      }
    });
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
