import React from "react";
import AuthButton from "../Common/Button/AuthButton";
import {BsGoogle} from "react-icons/bs";

const AuthForm = () => {
  return (
    <>
      <div className="flex justify-center flex-col">
        <AuthButton type="google" name="Google" icon={<BsGoogle size="24" />} />
      </div>
    </>
  );
};

export default AuthForm;
