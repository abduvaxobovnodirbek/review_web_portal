import { useState, SyntheticEvent, cloneElement } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

type childrenProps = {
  children: JSX.Element;
};

export default function TabMenu({ children }: childrenProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        position="sticky"
        top={0}
        className="!bg-white  z-50"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Recently Added" />
          <Tab label="Top trends" />
        </Tabs>
      </Box>

      {cloneElement(children, { value })}
    </Box>
  );
}
