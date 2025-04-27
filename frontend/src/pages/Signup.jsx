import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useNavigation } from 'react-router';

function Signup() {

    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>   
        <div className='flex flex-col justify-center rounded-lg bg-white text-center w-full px-10 p-4 h-full sm:px-40 md:px-4 md:w-90 md:h-max'>
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your information to create your account"}/>
            <InputBox label={"First Name"} value={firstName} placeholder={"John"} onChange={(e) => {
                setFirstName(e.target.value)
            }}/>
            <InputBox label={"Last Name"} value={lastName} placeholder={"Doe"} onChange={(e) => {
                setLastName(e.target.value)
            }}/>
            <InputBox label={"Email"} value={email} placeholder={"johndoe@example.com"} onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <InputBox label={"Password"} value={password} placeholder={"Enter Password"} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <Button label={"Sign Up"}  />
            <BottomWarning label={"Already have a account?"} buttonText={"Sign in"} to={"/signin"} />      
        </div>
    </div>
  )
}

export default Signup
