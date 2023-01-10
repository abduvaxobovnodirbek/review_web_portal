import FormComponent from "../../../features/reviewCreate/Form";
import Stepper from "../../../features/reviewCreate/Stepper/Stepper";
import useWindowSize from "../../../hooks/useWindowSize";
import Wrapper from "../../../layouts/ContextWrapper";

const ReviewCreate = () => {
  const { width } = useWindowSize();
  return (
    <div className="min-h-screen">
    <Wrapper
      flexOptions={`w-[90%] ${
        width > 1000 ? "justify-between" : "flex-col items-center"
      }`}
    >
      <Stepper />
      <FormComponent />
    </Wrapper>
    </div>
  );
};

export default ReviewCreate;
