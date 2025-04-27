import React from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'

function Dashboard() {
  return (
    <div>
      <div>
        <AppBar label={"Paytm App"}  />
        <div>
          <Balance value={"10,000"} />
          <Users />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
