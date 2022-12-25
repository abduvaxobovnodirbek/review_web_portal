import React from "react";

const index = ({ children, flexOptions }: any) => {
  return (
    <div className={`mx-auto w-[85%]  mt-10 flex  ${flexOptions}`}>
      {children}
    </div>
  );
};

export default index;
