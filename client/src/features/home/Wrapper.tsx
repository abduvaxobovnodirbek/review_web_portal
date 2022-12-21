import React from "react";

const index = ({ children }: any) => {
  return (
    <div className="mx-auto w-[85%] mt-10 flex items-start justify-between">
      {children}
    </div>
  );
};

export default index;
