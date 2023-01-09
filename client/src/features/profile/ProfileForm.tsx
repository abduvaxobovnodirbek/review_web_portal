import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AccountCircle } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { message, Spin } from "antd";
import Spinner from "../../components/spinner/Spinner";
import ProfileImage from "./ProfileImage";
import { Avatar, Button } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { editUser } from "../../services/api/user/user";
import { toggleProfileModal } from "../../services/ui/modalSlice";
import Cloudinary from "../../components/CloudImage/Cloudinary";
import { FaUserEdit } from "react-icons/fa";

let validationSchema = Yup.object({
  image: Yup.array(),
  name: Yup.string().required("*username  is required"),
  userInfo: Yup.string().min(30),
});
type FormValues = Yup.InferType<typeof validationSchema>;

const ProfileForm = () => {
  const { currentUser, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [newProfileImg, setNewProfileImg] = useState<boolean>(false);
  const initialValues: FormValues = {
    image: [],
    name: currentUser?.name || "",
    userInfo: currentUser?.userInfo || "",
  };

  const handleUpdateUser = async (data: FormValues, { resetForm }: any) => {
    let user = {};
    if (data.image?.length) {
      user = {
        ...data,
        image: data.image[0].preview,
        public_id: currentUser?.image,
      };
    } else {
      user = { name: data.name, userInfo: data.userInfo };
    }
    dispatch(editUser({ id: currentUser?._id || "", data: user }))
      .unwrap()
      .then(() => {
        message.success("Successfully  profile edited!");
        dispatch(toggleProfileModal(false));
      })
      .catch(() => {
        message.error("Something went wrong");
      });
  };

  const handleNewImage = (value: boolean) => {
    setNewProfileImg(value);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateUser}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              {loading ? <Spinner isLoading={loading} /> : ""}
              <div className="flex justify-center w-[100%] mb-4">
                {newProfileImg ? (
                  <ProfileImage
                    formik={formik}
                    handleNewImage={handleNewImage}
                  />
                ) : (
                  <div>
                    {currentUser?.image ? (
                      <div className=" flex !relative items-end justify-center">
                        <div className="!rounded-full flex overflow-hidden w-[100px] h-[100px]">
                          <Cloudinary img={currentUser.image} />
                        </div>
                        <FaUserEdit
                          onClick={() => {
                            handleNewImage(true);
                          }}
                          className="!cursor-pointer !text-gray-600 absolute -right-2"
                          fontSize={30}
                          color="gray"
                        />
                      </div>
                    ) : (
                      <div className=" flex !relative items-end justify-center">
                        <Avatar
                          sx={{
                            background: "#03776f",
                            width: 70,
                            height: 70,
                          }}
                        >
                          <AccountCircle className="text-white !text-7xl" />
                        </Avatar>
                        <FaUserEdit
                          onClick={() => {
                            handleNewImage(true);
                          }}
                          className="!cursor-pointer !text-gray-600 absolute -right-2"
                          fontSize={30}
                          color="gray"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center flex-col w-[100%]">
                <Field
                  name="name"
                  type="text"
                  className={` text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider ${
                    formik.touched.name && formik.errors.name
                      ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : "Add your username"
                  }
                />
                <Field
                  name="userInfo"
                  type="text"
                  className={`text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-xl tracking-wider ${
                    formik.touched.userInfo && formik.errors.userInfo
                      ? "border-red-300 focus:border-red-300"
                      : ""
                  }`}
                  placeholder={"Add Bio"}
                />
                {formik.touched.userInfo && formik.errors.userInfo ? (
                  <span className="text-red-500 text-sm  italic">
                    {formik.errors.userInfo}
                  </span>
                ) : (
                  ""
                )}
                <button
                  className="!rounded-2xl !mt-4 !text-white bg-gray-600 !py-2 !px-4 !text-sm"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Confirm Changes
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileForm;
