import Box from "@mui/material/Box";
import { TabPanelProps } from "../../types";
import ReviewCard from "./ReviewCard";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ReviewList = ({ value }: any) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewCard />
      </TabPanel>
    </>
  );
};

export default ReviewList;
