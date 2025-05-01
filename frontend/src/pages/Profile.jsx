import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState();
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSave = async() => {
    try{
      const token = localStorage.getItem("token")

      const updatedData = {};

      for(let key in form) {
        const value = form[key]?.trim()
        if(value !== "") {
          updatedData[key] = value
        }
      }
      
      const response = await axios.put("http://localhost:3000/api/v1/user/update",
          updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )

      console.log(response)

    } catch(err) {
      console.log(err)
    }
  };

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

  return (
    <div>
      {/* header */}
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
      {/* user info */}
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
            onClick={() => setShowEdit(true)}
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

      {/* edit page */}




      {showEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full h-full sm:w-90 sm:h-max relative">
            <div className="text-2xl font-semibold mb-4">Edit Profile</div>
            <div
              className="absolute top-3 right-3 text-xl cursor-pointer"
              onClick={() => setShowEdit(false)}
            >
              <FaXmark />
            </div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}





    </div>
  );
}

export default Profile;
