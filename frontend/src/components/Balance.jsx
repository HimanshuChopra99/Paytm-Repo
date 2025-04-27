import React from 'react'

function Balance({value}) {
  return (
    <div className='px-4 py-6 text-xl font-semibold flex gap-2 sm:px-10 sm:py-10 sm:text-2xl'>
      Your Balance
      <p className='font-medium'>Rs. {value}</p>
    </div>
  )
}

export default Balance
