import React from 'react'

function Button({label}) {
  return (
    <div className=' bg-[#323232] text-white font-medium py-2 my-4 mx-4 rounded-lg hover:bg-black duration-100'>
      {label}
    </div>
  )
}

export default Button

