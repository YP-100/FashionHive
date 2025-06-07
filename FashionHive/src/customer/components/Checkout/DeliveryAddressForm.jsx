import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../state/Order/Action'
import { useNavigate } from 'react-router-dom'

const DeliveryAddressForm = () => {// { setActiveStep } inside

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((store) => store.auth)
//  console.log("auth.user in DeliveryAddressForm",auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const address ={
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      streetAddress: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      zipCode: data.get('zip'),
      mobile: data.get('phoneNumber'),
    }
    const orderData = {address,navigate}

    // console.log("order data in DeliveryAddressForm",orderData)
    dispatch(createOrder(orderData))
    // setActiveStep(3);
    // navigate("/checkout?step=3");


    // console.log("address",address)
  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 5 }} className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
          <div className='sticky top-0 bg-white'>
            <p>Recently used Delivery Address</p>
          </div>
          <div className='p-5 py-7 border-b cursor-pointer'>
          { 
          auth.user?.address?.map((item)=><AddressCard address={item} key={item._id}/>) 
          }
            {/* <Button sx={{ mt: 2, bgcolor: '#ca8a04', color: 'white' }} size='large' variant='contained'>
              Deliver Here
            </Button> */}
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <Box className='border rounded-s-md shadow-md p-5'>
            <form onSubmit={handleSubmit} id='address-form'>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    fullWidth
                    autoComplete='given-name'
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='lastName'
                    name='lastName'
                    label='Last Name'
                    fullWidth
                    autoComplete='family-name'
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    id='address'
                    name='address'
                    label='Address'
                    fullWidth
                    autoComplete='street-address'
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='city'
                    name='city'
                    label='City'
                    fullWidth
                    autoComplete='address-level2'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='state'
                    name='state'
                    label='State/Province/Region'
                    fullWidth
                    autoComplete='address-level1'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='zip'
                    name='zip'
                    label='Zip/Postal Code'
                    fullWidth
                    autoComplete='shipping postal-code'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id='phoneNumber'
                    name='phoneNumber'
                    label='Phone Number'
                    fullWidth
                    autoComplete='tel'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button sx={{ py: 1.5, mt: 2, bgcolor: '#ca8a04', color: 'white' }} size='large' variant='contained'
                  type='submit'>
                    Deliver Here
                  </Button>
                </Grid>


              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeliveryAddressForm
