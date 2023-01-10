import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNavigateParams from "../../hooks/useNavigateParams";
import useWindowSize from "../../hooks/useWindowSize";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../layouts/header/HeaderStyle";

const SearchCustom = () => {
  const [value, setValue] = useState<string>("");
  const navigateParams = useNavigateParams();
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      navigateParams("search", { q: value } as any);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Search
        sx={
          width < 600
            ? {
                height: "30px",
                maxWidth: "50px",
                marginLeft: "10px",
                cursor: "pointer",
              }
            : {}
        }
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onClick={(e: MouseEvent) => (width > 600 ? "" : navigate("/search"))}
      >
        <SearchIconWrapper>
          <SearchIcon className="dark:text-white" />
        </SearchIconWrapper>
        {width > 600 ? (
          <StyledInputBase
            className=" dark:!bg-zinc-700 dark:text-white"
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        ) : (
          ""
        )}
      </Search>
    </form>
  );
};

export default SearchCustom;
