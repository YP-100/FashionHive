import React from 'react'

const AddressCard = ({address}) => {
  // console.log("addres in address card : ",address)
  return (
    <div>
      <div className='text-start'>
        <p className='font-semibold'>{address?.firstName+" "+address?.lastName}</p>
        <p>{address?.city +", "+address?.streetAddress+", "+address?.state+", "+address?.zipCode}</p>
        <div className='space-y-1'>
          <p className='font-semibold'>Phone Number</p>
          <p>{address?.mobile}</p>
        </div>  
      </div>                   
    </div>
  )
}

export default AddressCard
