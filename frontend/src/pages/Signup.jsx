import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from "axios"
import { useNavigate } from 'react-router';

function Signup() {

    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    const navigator = useNavigate()


  return (
    <div className='bg-slate-300 h-[100svh] flex justify-center items-center'>   
        <div className='flex flex-col justify-center rounded-0 md:rounded-lg bg-white text-center w-full px-10 p-4 h-full sm:px-40 md:px-4 md:w-90 md:h-max'>
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your information to create your account"}/>
            <InputBox label={"First Name"} value={firstName} type={"text"} placeholder={"John"} onChange={(e) => {
                setFirstName(e.target.value)
            }}/>
            <InputBox label={"Last Name"} value={lastName} type={"text"} placeholder={"Doe"} onChange={(e) => {
                setLastName(e.target.value)
            }}/>
            <InputBox label={"Email"} value={username} type={"text"} placeholder={"johndoe@example.com"} onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <InputBox label={"Password"} value={password} type={"password"} placeholder={"Enter Password"} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <Button onClick={async () => {
               try{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",
                    {
                        username,
                        password,
                        firstName,
                        lastName
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json', 
                        }
                    })
                    localStorage.setItem("token", response.data.token)
                    navigator("/dashboard")
                    console.log(response)
               } catch(err) {
                console.log("error:", err)
               }
            }} label={"Sign up"} />

            <BottomWarning label={"Already have a account?"} buttonText={"Sign In"} to={"/signin"} />      
        </div>
    </div>
  )
}

export default Signup
