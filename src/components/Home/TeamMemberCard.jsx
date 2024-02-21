import React from "react";
import TeamMemberImg from "./images/TeamMember.png";
import { FaLinkedin } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const TeamMemberCard = ({ name, designation, description, link }) => {
  return (
    <div className="container p-6 h-[280px] border rounded-[45px] border-[#191A23] border-1  ">
      <div className="flex items-end relative flex-row gap-4 border-[#191A23] border-b-[1px] pb-3">
        <img
          className="w-1/3  aspect-square object-contain  "
          src={TeamMemberImg}
          alt="icon"
        />
        <div className="container ">
          <h3 className="font-medium text-lg text-start">{name}</h3>
          <p className="font-normal text-lg text-start">{designation}</p>
        </div>
        <TiSocialLinkedinCircular className="text-green-500 bg-black absolute right-0 top-0 text-3xl rounded-full" />
      </div>
      <p className="text-start py-8">{description}</p>
    </div>
  );
};

export default TeamMemberCard;
