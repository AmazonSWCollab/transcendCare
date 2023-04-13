import Link from "next/link";
import React from "react";
// This is a reusable component when we need a button that redirects to another page when clicked
interface LinkProps {
  title: string; //title of the button
  color: string; //color of the button
  href: string; //where will it redirect when clicked
  custom?: string; //additional styling
}

const LinkButton: React.FC<LinkProps> = ({ title, color, href, custom }) => {
  return (
    <Link
      href={href}
      style={{ backgroundColor: color }}
      className={`${custom} p-2 rounded-lg`}
    >
      {title}
    </Link>
  );
};

export default LinkButton;
