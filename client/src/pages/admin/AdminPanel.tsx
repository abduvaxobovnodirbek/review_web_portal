import { useTranslation } from "react-i18next";
import TabPanel from "../../components/TabPanel/TabPanel";
import AllCategories from "../../features/adminControl/categoryList/AllCategories";
import AllReviews from "../../features/adminControl/reviewList/AllReviews";
import AllUsers from "../../features/adminControl/usersList/AllUsers";
import TabMenu from "../../features/home/Tab/TabMenu";
import ContextWrapper from "../../layouts/ContextWrapper";

const AdminPanel = () => {
  const { t } = useTranslation();
  return (
    <ContextWrapper flexOptions={"justify-center"}>
      <TabMenu
        tabOptions={{
          names: [t("p88"), t("p3"), t("p67")],
        }}
      >
        <Panels />
      </TabMenu>
    </ContextWrapper>
  );
};

const Panels = ({ value }: any) => {
  return (
    <div className="dark:min-h-screen">
      <TabPanel value={value} index={0}>
        <AllUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllReviews />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllCategories />
      </TabPanel>
    </div>
  );
};

export default AdminPanel;
