import React, { useState } from "react";
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router";

function Signin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigator = useNavigate()

  return (
    <div className= "bg-slate-300 h-[100svh] flex justify-center items-center ">
      <div className="flex flex-col justify-center rounded-0 md:rounded-lg bg-white text-center w-full px-10 p-4 h-full sm:px-40 md:px-4 md:w-90 md:h-max">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your crentials to access your account"} />
        <InputBox label={"Email"} type={"text"} placeholder={"johndoe@example.com"} onChange={(e) => {
          setUsername(e.target.value)
        }} />
        <InputBox label={"Password"} type={"password"} placeholder={"Enter Password"} onChange={(e) => {
          setPassword(e.target.value)
        }} />
        <Button onClick={async() => {
          try{
            const resposne = await axios.post("http://localhost:3000/api/v1/user/signin",
              {
                username,
                password
              },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              localStorage.setItem("token", resposne.data.token)
              navigator('/dashboard')
              console.log(resposne)
            } catch(err) {
            console.log("Error:", err)
          }
        }} label={"Sign In"} />
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  );
}

export default Signin;
