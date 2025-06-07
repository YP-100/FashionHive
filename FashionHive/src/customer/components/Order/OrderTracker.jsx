import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'

const steps=[
    "payment pending",
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
]

const OrderTracker = ({activeStep}) => {
  return (
    <div className='w-full overflow-x-auto'>    
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) =>
            <Step key={label}>
                <StepLabel sx={{color:"#9155FD", fontSize: "44px"}}>{label}</StepLabel>
            </Step>
        )}

      </Stepper>
    </div>
  )
}

export default OrderTracker
