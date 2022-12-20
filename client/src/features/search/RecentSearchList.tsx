import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function RecentSearchList() {
  return (
    <Grid item xs={12} md={12}>
      <Typography
        sx={{ mt: 4, mb: 2, ml: 2, fontWeight: "bold" }}
        variant="h5"
        component="div"
      >
        Recent Searches
      </Typography>
      <List>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <CloseIcon />
            </IconButton>
          }
          className="border-b"
        >
          <ListItemText primary="Single-line item" />
        </ListItem>

        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <CloseIcon />
            </IconButton>
          }
          className="border-b"
        >
          <ListItemText primary="Single-line item" />
        </ListItem>
      </List>
    </Grid>
  );
}
