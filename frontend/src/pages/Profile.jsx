import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.userData);
      } catch (err) {
        console.log("Error in getting data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (err) {
        console.log("Error in getting data", err);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="relative py-4 px-4 sm:px-10 border-b border-[#727272]">
        <div className="text-4xl font-bold">Profile</div>
        <div
          className="absolute top-6 right-6 text-2xl"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <FaXmark />
        </div>
      </div>
      <div className="px-9 py-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center bg-slate-300 h-10 w-10 rounded-full font-semibold text-lg">
            H
          </div>
          <p className="text-slate-400 text-lg">johndoe@gmail.com</p>
        </div>
        <div className="text-black text-lg flex flex-col">
          <p>FirstName : {user ? user.firstName : "Loading..."}</p>
          <p>LastName : {user ? user.lastName : "Loading..."}</p>
          <p>Balance : {balance?.toFixed(2) || "N/A"}</p>
          <button
            onClick={() => {}}
            className="bg-slate-200 w-40 mt-4 text-black rounded-lg py-2 px-4 text-start"
          >
            {"Edit Profile>"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="bg-red-500 w-40 mt-4 text-black rounded-lg py-2 px-4 text-start"
          >
            {"Logout>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
