import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { CgSearchFound } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="dark:min-h-screen ">
      <div className="text-gray-600 mt-24 font-serif flex justify-center flex-col items-center">
        <CgSearchFound className="text-gray-200 text-[100px]" />
        <div className="text-center dark:text-white">
          <h3>{t("p51")} </h3>
          <p>{t("p54")}</p>
        </div>
        <Button className=" mt-3" onClick={() => navigate("/")}>
          {t("p55")}
        </Button>
      </div>
    </div>
  );
};

export default Error;
