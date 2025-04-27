import React from "react";
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function Signin() {
  return (
    <div className= "bg-slate-300 h-screen flex justify-center items-center ">
      <div className="flex flex-col justify-center rounded-lg bg-white text-center w-full px-10 p-4 h-full sm:px-40 md:px-4 md:w-90 md:h-max">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your crentials to access your account"} />
        <InputBox label={"Email"} placeholder={"johndoe@example.com"} />
        <InputBox label={"Password"} placeholder={"Enter Password"} />
        <Button label={"Sign In"} />
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  );
}

export default Signin;
