import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "../../components/searchInput/SearchInput";
import ReviewCard from "../../components/review/ReviewCard";
import RecentSearchList from "../../features/search/RecentSearchList";
import useWindowSize from "../../hooks/useWindowSize";

const Search = () => {
  const { width } = useWindowSize();

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: 1100,
        marginX: "auto",
        marginTop: "15px",
      }}
    >
      <Grid container spacing={2}>
        {width < 600 ? (
          <Grid item xs={12} md={12}>
            <Input />
          </Grid>
        ) : (
          ""
        )}

        <RecentSearchList />
        <div className="mx-4">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </Grid>
    </Box>
  );
};

export default Search;
