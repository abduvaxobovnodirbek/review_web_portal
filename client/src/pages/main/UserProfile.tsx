import ReviewCard from "../../components/review/ReviewCard";
import Profile from "../../components/userProfile/Profile";
import useWindowSize from "../../hooks/useWindowSize";
import ContextWrapper from "../../layouts/ContextWrapper";

const UserProfile = () => {
  const { width } = useWindowSize();

  return (
    <ContextWrapper
      flexOptions={`justify-between items-start ${
        width < 900 ? "w-[95%]" : ""
      }`}
    >
      {/* <div className={`${width < 900 ? "w-[100%]" : "w-[90%]"} p-4`}>
        {width < 900 ? <Profile /> : null}
        {width > 576 ? (
          <h2 className="text-3xl font-bold font-serif mb-6 border-b-2 px-2 pb-4 mt-4 border-dotted border-b-black">
            Nodirbek Abduvaxobov
          </h2>
        ) : (
          <h2 className="text-xl font-bold font-serif mb-6 border-b-2 text-gray-500 mt-6 pb-2 border-b-black border-dotted">
            Reviews
          </h2>
        )}
        <ReviewCard includeHead={false} />
        <ReviewCard includeHead={false} />
        <ReviewCard includeHead={false} />
      </div>

      {width > 900 ? (
        <div className="w-[40%] border-l sticky top-0 min-h-screen">
          <Profile />
        </div>
      ) : null} */}
    </ContextWrapper>
  );
};

export default UserProfile;
