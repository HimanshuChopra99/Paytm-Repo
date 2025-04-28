import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      try{
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk")
        setUsers(response.data.user)
      } catch(err) {
        console.log("error:", err)
      }
    };

    fetchdata()
  }, []);
  
  return (
    <div className='px-4 sm:px-10'>
      <div className='text-xl sm:text-2xl font-semibold'>
        Users
      </div>
      <div className='bg-[#ececec] rounded-lg my-5  md:my-10'>
        <input className='w-full py-3 focus:outline-none px-4' type="text" placeholder='Seacrh users...' />
      </div>
      {users.map((user) => {
        return <User user={user} />
      })}
    </div>
  )
}

function User({ user }) {

  const navigate = useNavigate()

  return(
    <div className='flex justify-between items-center hover:bg-[#ececec] hover:scale-101 duration-200 p-4 rounded-2xl group'>
        <div className='flex items-center gap-4'>
            <div className='h-10 w-10 flex justify-center items-center text-lg font-medium rounded-full bg-[#DDDDDD] group-hover:bg-white duration-200 sm:h-15 sm:w-15 sm:text-3xl'>
                {user.firstName[0].toUpperCase()}
            </div>
            <div className='text-lg sm:text-2xl'>
                {user.firstName}{user.lastName}
            </div>
        </div>
        <button onClick={(e) => {
          navigate("/send", { state: { user } }); 
          console.log({ state: { user } })
        }} className='bg-black text-white text-[14px] h-9 w-32 rounded-lg sm:h-12 sm:w-35'>Send Money</button>
      </div>
  )
}

export default Users
