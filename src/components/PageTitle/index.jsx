import React from "react";
import BackIcon from "../BackIcon";

const PageTitle = ({ text, noBackBtn }) => {
  return (
    <h1 className="text-3xl pl-2 pr-4 mr-auto table bg-green leading-10  font-medium mb-16 text-start">
      <div className="flex items-center gap-4 justify-start">
        {!noBackBtn && <BackIcon className="" />}
        {text}
      </div>
    </h1>
  );
};

export default PageTitle;
