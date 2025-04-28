import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

function Dashboard() {

  const [user, setUser] = useState()
  const [balance, setBalance] = useState()

  useEffect(() => {
    const fetchData = async() => {
     try{
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data.userData)
     } catch(err) {
      console.log("Error in getting data", err)
     }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async() => {
     try{
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBalance(response.data.balance)
     } catch(err) {
      console.log("Error in getting data", err)
     }
    }

    fetchData();
  }, [])

  return (
    <div>
      <div>
        <AppBar label={"Paytm App"} firstName={user?.firstName} lastName={user?.lastName}  />
        <div>
          <Balance value={balance} />
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
