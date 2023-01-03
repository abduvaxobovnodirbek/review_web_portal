import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleProfileModal } from "../../services/modal/modalSlice";
import { Fade } from "@mui/material";
import ProfileForm from "./ProfileForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default function ProfileModal() {
  const { showProfileModal } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(toggleProfileModal(false));
  };

  return (
    <div>
      <Dialog
        open={showProfileModal}
        TransitionComponent={Transition}
        keepMounted
        transitionDuration={500}
        BackdropProps={{ style: { backgroundColor: "#ffffffcf" } }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            boxShadow: "black 0px 0px 7px 0px #505050",
            width: "500px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <DialogTitle
          className="flex justify-center  relative top-5"
          sx={{ color: "#03776f" }}
        >
          <span className="font-serif text-center"> Edit Profile</span>
        </DialogTitle>
        <DialogContent className="mt-12">
          <ProfileForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
