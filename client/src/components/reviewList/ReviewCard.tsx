import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ReviewActions from "../../features/home/Review/ReviewActions";
import randomImage from "../../assets/random.jpg";

export default function ReviewCard() {
  return (
    <Card sx={{ maxWidth: "100%" }} className="border-b mb-2" elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <div className="flex items-center justify-between">
      <div>
      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          className="!font-bold !text-lg"
        >
          It's 2022, Please Don't Just Use “console.log” Anymore
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      </div>

      <img src={randomImage} alt="random photos" className="w-[200px] h-[150px] object-cover rounded-md" />
      </div>

      <ReviewActions />
    </Card>
  );
}
