import React from 'react'

function AppBar({ label}) {
  return (
    <div className='flex justify-between items-center py-4 px-4 sm:px-10 border-b border-[#727272]'>
        <div className='text-xl sm:text-4xl font-semibold'>
            {label}
        </div>
        <div className='flex items-center gap-1 text-sm font-medium sm:text-lg'>
            <div>
                Hello, Username
            </div>
            <div className='bg-gray-200 flex justify-center items-center h-8 w-8 ml-2 text-center rounded-full sm:h-12 sm:w-12'>
                U
            </div>
        </div>
    </div>
  )
}

export default AppBar
