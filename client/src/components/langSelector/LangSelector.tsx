import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import classes from "./LangSelector.module.css";

const LangSelector = () => {
  const [selected, setSelected] = useState<string>("RU");

  const countries: string[] = ["RU", "US", "UZ"];

  const onSelect = (code: string) => {
    setSelected(code);
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
