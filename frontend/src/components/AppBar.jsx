import React, { useState } from 'react'
import Menu from './Menu';

function AppBar({ label, firstName, lastName }) {

    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <div className='flex justify-between items-center relative py-4 px-4 sm:px-10 border-b border-[#727272]'>
        <div className='text-xl sm:text-4xl font-semibold'>
            {label}
        </div>
        <div className='flex items-center gap-1 text-sm font-medium sm:text-lg'>
            <div>
                Hello, {firstName}{lastName}
            </div>
            <div className='bg-gray-200 font-semibold flex justify-center items-center h-8 w-8 ml-2 text-center rounded-full sm:h-12 sm:w-12'
            onClick={() => {
                setIsVisible(prev => !prev)
            }}
            >
                {firstName?.[0]?.toUpperCase()}
            </div>
            <Menu firstName={firstName} lastName={lastName} isVisible={isVisible} toggleVisibility={toggleVisibility} />
        </div>
    </div>
  )
}

export default AppBar
