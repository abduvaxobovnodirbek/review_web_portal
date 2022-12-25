const Category: React.FC = () => {
  return (
    <div className="mt-3">
      <label
        htmlFor="category"
        className="font-serif text-gray-400 tracking-wider cursor-pointer"
      >
        Category:
      </label>
      <select
        id="category"
        className={`font-serif px-2 tracking-wider pb-3  outline-none border-b`}
        style={{ width: "100%" }}
      >
        <option value=""></option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
        <option value="film">Film</option>
        <option value="book">Book</option>
      </select>
    </div>
  );
};

export default Category;
