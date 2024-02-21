import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FeaturesCard = ({ feature }) => {
  const { title, template, link, icon } = feature;
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
      className={`col-span-1 flex content-center flex-row gap-8 box-border shadow-xl h-80 border rounded-[45px] border-[#191A23] border-1 p-8 bg-[${getBgColor()}]`}
    >
      <div className="w-1/2 flex flex-col text-start justify-between">
        <h1
          className={`font-medium text-3xl bg-[${getTitleColor()}] text-start  inline-block py-1 px-2`}
        >
          {title}
        </h1>
        <Link
          to={link}
          className="text-xl flex gap-3 justify-start items-center"
        >
          <FaCircleArrowRight
            className={`-rotate-12 text-2xl ${getLinkColor()} `}
          />{" "}
          Learn More
        </Link>
      </div>
      <img
        className="w-1/2  aspect-square object-contain p-8"
        src={icon}
        alt="icon"
      />
    </div>
  );
};

export default FeaturesCard;
