import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function TrendReviewCard() {
  return (
    <Card className="mb-2" elevation={0} >
      <CardHeader
        avatar={
          <Avatar
            sx={{ background: "#00000064", width: 24, height: 24 }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          className="!font-bold !text-lg"
        >
          It's 2022, Please Don't Just Use “console.log” Anymore but the next feature is good
        </Typography>
      </CardContent>
    </Card>
  );
}
