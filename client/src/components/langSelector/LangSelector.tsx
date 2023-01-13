import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import classes from "./LangSelector.module.css";

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<string>(
    localStorage.getItem("i18nextLng")?.toUpperCase() || ""
  );

  const countries: string[] = ["RU", "US", "UZ"];

  const onSelect = (code: string) => {
    setSelected(code);
    i18n.changeLanguage(code.toLowerCase());
  };

  return (
    <ReactFlagsSelect
      className={classes.selector}
      alignOptionsToRight={true}
      selected={selected}
      selectButtonClassName="text-white"
      onSelect={onSelect}
      countries={countries}
      fullWidth={false}
      showSelectedLabel={false}
      customLabels={{ RU: "RU", US: "US", UZ: "UZ" }}
    />
  );
};

export default LangSelector;
