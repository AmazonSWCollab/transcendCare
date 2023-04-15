import React from "react";
interface AuthProps {
  type: string;
  name: string;
  icon: JSX.Element;
}
const AuthButton: React.FC<AuthProps> = ({ type, name, icon }) => {
  return (
    <button className="p-2 bg-transparent border-2 border-purple_main mt-8 rounded-md">
      Continue with {name}
      {icon}
    </button>
  );
};

export default AuthButton;
