import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router';

function Menu({firstName, lastName, isVisible, toggleVisibility}) {

    const navigate = useNavigate()

  return (
    <div className={`absolute flex flex-col items-start gap-1 top-0 right-0 bg-white w-full h-screen px-6 pt-20 pb-10 rounded-bl-2xl ${isVisible? "block":"hidden"} shadow-xs-0 sm:h-max sm:w-60 sm:shadow-lg`}>
        <div className='absolute top-6 right-6 text-2xl' onClick={toggleVisibility}><FaXmark /></div>
        <div className='bg-white w-full py-2 pb-6 mb-1 flex items-center gap-4 border-b-1'>
            <div className='bg-slate-200 flex justify-center items-center rounded-full h-10 w-10'>{firstName?.[0]?.toUpperCase()}</div>
            <div className='text-xl'>{firstName}{lastName}</div>
        </div>
        <button className='bg-slate-200 w-full rounded-sm py-3 px-4 text-start' onClick={() => {
            navigate("/profile")
        }}>{"Profile>"}
        
        </button>
        <button onClick={() => {
            localStorage.removeItem("token")
            navigate("/signin")
        }} className='bg-red-500 w-full rounded-sm py-3 px-4 text-start'>{"Logout>"}</button>
    </div>
  )
}

export default Menu
