const ReviewGroup = () => {
  return (
    <>
      <label
        htmlFor="reviewedArticle"
        className="font-serif text-gray-400 tracking-wider cursor-pointer"
      >
        Reviewed piece of art:
      </label>

      <div className="mb-4">
        <input
          id="reviewedArticle"
          name=""
          type="text"
          className=" border-b outline-none w-[100%] focus:border-gray-400 p-3 transition-colors font-serif text-xl tracking-wider"
        />
      </div>
    </>
  );
};

export default ReviewGroup;
