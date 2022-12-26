import FormComponent from "../../features/createReview/Form";
import Stepper from "../../features/createReview/Stepper/Stepper";
import useWindowSize from "../../hooks/useWindowSize";
import Wrapper from "../../layouts/ContextWrapper";

const CreateReview = () => {
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

export default CreateReview;
