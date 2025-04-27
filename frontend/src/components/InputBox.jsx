import React from 'react'

function InputBox({ label, placeholder, onChange}) {
  return (
    <div className='flex flex-col items-start px-4 py-2'>
        <div className='text-black font-medium pb-2'>
            {label}
        </div>
        <input 
        className='border-1 text-slate-500 px-4 py-1 rounded-sm w-full focus:outline-none'
        type="text" 
        placeholder={placeholder} 
        onChange={onChange} />
    </div>
  )
}

export default InputBox
