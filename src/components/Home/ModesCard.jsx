import { Button } from "@mui/base";
import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ModesCard = ({ mode }) => {
  const { title, description, link, btnText, icon } = mode;
  const colors = {
    grey: "#F3F3F3",
    green: "#B9FF66",
    black: "#191A23",
    white: "#FFFFFF",
  };
  const getBgColor = () => {
    switch (template) {
      case 1:
        return colors.grey;
      case 2:
        return colors.green;
      case 3:
        return colors.black;

      default:
        break;
    }
  };
  const getTitleColor = () => {
    switch (template) {
      case 1:
        return colors.green;
      case 2:
        return colors.white;
      case 3:
        return colors.white;

      default:
        break;
    }
  };
  const getLinkColor = () => {
    switch (template) {
      case 1:
        return `bg-[${colors.black}] text-[${colors.green}]`;
      case 2:
        return `bg-[${colors.black}] text-[${colors.green}]`;
      case 3:
        return `bg-[${colors.white}] text-[${colors.black}]`;

      default:
        break;
    }
  };
  return (
    <div
      className={`flex mt-16 mb-24 content-center flex-row gap-8 box-border shadow-xl h-[400px] border rounded-[45px] border-[#191A23] border-1 p-8 bg-[#F3F3F3]`}
    >
      <div className="w-1/2 flex flex-col text-start justify-between">
        <h1 className={`font-medium text-3xl  text-start py-1 px-2`}>
          {title}
        </h1>
        <p className="font-normal text-xl  text-start py-1 px-2">
          {description}
        </p>
        <Button className="py-4 px-6 mr-auto border rounded-2xl bg-black text-white ">
          {btnText}
        </Button>
      </div>
      <div className="container relative">
        <img
          className="w-1/2  aspect-square object-contain p-8 z absolute -top-16 right-16 scale-[1.5]"
          src={icon}
          alt="icon"
        />
      </div>
    </div>
  );
};

export default ModesCard;
