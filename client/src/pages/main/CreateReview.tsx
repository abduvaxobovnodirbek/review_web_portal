import FormComponent from "../../features/createReview/Form";
import Stepper from "../../features/createReview/Stepper/Stepper";
import Wrapper from "../../layouts/Wrapper";

const CreateReview = () => {
  return (
    <Wrapper flexOptions={"justify-between w-[90%]"}>
      <Stepper />
      <FormComponent />
    </Wrapper>
  );
};

export default CreateReview;
