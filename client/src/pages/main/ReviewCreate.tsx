import FormComponent from "../../features/reviewCreate/Form";
import Stepper from "../../features/reviewCreate/Stepper/Stepper";
import useWindowSize from "../../hooks/useWindowSize";
import Wrapper from "../../layouts/ContextWrapper";

const ReviewCreate = () => {
  const { width } = useWindowSize();
  return (
    <Wrapper
      flexOptions={`w-[90%] ${
        width > 1000 ? "justify-between" : "flex-col items-center"
      }`}
    >
      <Stepper />
      <FormComponent />
    </Wrapper>
  );
};

export default ReviewCreate;
