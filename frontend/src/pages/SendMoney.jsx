import axios from "axios";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";

function SendMoney() {
  const location = useLocation();
  const user = location?.state.user;
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  return (
    <div className="reltive w-full bg-slate-300 h-[100svh] flex justify-center items-center">
      <div className="w-full h-full bg-white flex flex-col px-4 py-8 rounded-0 sm:rounded-2xl sm:h-max sm:w-90">
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="absolute top-5 right-5 text-4xl font-bold sm:top-10 sm:right-10"
        >
          <FaXmark />
        </button>
        <h2 className="text-center text-4xl font-bold pt-10 pb-24 sm:pt-2 sm:pb-15 ">
          Send Money
        </h2>
        <div className="flex items-center gap-2 px-4 pb-10 sm:pb-5">
          <div className="h-8 w-8 flex justify-center items-center rounded-full bg-slate-400 font-semibold ">
            {user.username[0]}
          </div>
          <div>{user.username}</div>
        </div>
        <div className="text-slate-500 text-md px-4 pb-4 sm:pb-2">
          Amount (in Rs)
        </div>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="mx-4 py-2 px-4 border-e-gray-300 text-slate-500 rounded-md  border-1 focus:outline-none mb-6"
          type="number"
          placeholder="Enter amount"
        ></input>
        <button
          onClick={async() => {
            try{
              const token = localStorage.getItem("token")
              const to = user._id
              console.log(to)

              if (!amount || isNaN(amount) || Number(amount) <= 0) {
                alert('Please enter a valid amount greater than 0');
                return;
              }

              const response = await axios.post("http://localhost:3000/api/v1/account/transfer", 
                {
                  to,
                  amount
                }, 
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                });
                navigate("/dashboard");
              console.log('Amount transfter successfully', response)
            } catch(err) {
              console.log("Transaction failed", err)
            }
          }}
          className="h-12 mx-4 rounded-lg bg-green-500 text-white hover:bg-green-700 duration-200"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
