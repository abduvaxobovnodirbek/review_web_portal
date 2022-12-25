import { message } from "antd";
import { Button } from "@mui/material";
import { useEffect } from "react";

const ReviewDetail = ({ formik }: any) => {
  useEffect(() => {
    const images = document.querySelectorAll(".preWrapper  img");
    console.log(images);
  }, []);

  return (
    <>
      <h3>Demo visualization</h3>

      <div>
        <h2>{formik.values.title}</h2>
        <div
          className="preWrapper"
          dangerouslySetInnerHTML={{
            __html: formik.values.description,
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
        onClick={() => message.success("Processing complete!")}
      >
        Done
      </Button>
    </>
  );
};

export default ReviewDetail;
