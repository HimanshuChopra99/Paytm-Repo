import React from 'react'

function Users() {
  return (
    <div className='px-4 sm:px-10'>
      <div className='text-xl sm:text-2xl font-semibold'>
        Users
      </div>
      <div className='bg-[#ececec] rounded-lg my-5  md:my-10'>
        <input className='w-full py-3 focus:outline-none px-4' type="text" placeholder='Seacrh users...' />
      </div>
      <div className='flex justify-between items-center hover:bg-[#ececec] hover:scale-101 duration-200 p-4 rounded-2xl group'>
        <div className='flex items-center gap-4'>
            <div className='h-10 w-10 flex justify-center items-center text-lg font-medium rounded-full bg-[#DDDDDD] group-hover:bg-white duration-200 sm:h-15 sm:w-15 sm:text-3xl'>
                U
            </div>
            <div className='text-lg sm:text-2xl'>
                Username
            </div>
        </div>
        <button className='bg-black text-white text-[14px] h-9 w-32 rounded-lg sm:h-12 sm:w-35'>Send Money</button>
      </div>
    </div>
  )
}

export default Users
