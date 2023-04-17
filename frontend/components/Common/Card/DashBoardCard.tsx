import Link from "next/link";
import React from "react";
interface DashBoardCardProps {
  header?: string;
  title: string;
  subtitle: string;
  color: string;
  shadow?: string;
  custom?: string;
  additionalText?: string;
  link?: string;
  pic?: string;
}
const DashBoardCard: React.FC<DashBoardCardProps> = ({
  header,
  title,
  subtitle,
  color,
  shadow,
  custom,
  additionalText,
  pic,
  link,
}) => {
  return (
    <>
      <p className="mt-10 text-xl font-semibold">{header}</p>
      <div
        style={{ backgroundColor: color }}
        className="shadow-lg shadow-[rgba(0, 0, 0, 0.25)] overflow-hidden h-[140px] mt-4 relative rounded-lg p-4"
      >
        <p className="text-lg font-bold"> {title}</p>
        <p className="font-light w-1/2">{subtitle}</p>
        <img
          className="z-[2] absolute right-0 bottom-0"
          src={pic}
          alt="card picture"
        />
        <div
          style={{ backgroundColor: shadow }}
          className="z-0 absolute w-[180px] h-[100px] right-0 rounded-[50%]"
        ></div>
        <Link href={`${link}`}>
          <p className="mt-10"> {additionalText}</p>
        </Link>
      </div>
    </>
  );
};

export default DashBoardCard;
