import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import OrdersTable from '../View/OrderTableView'
import ProductsTable from '../View/ProductTableView'
import DailyOverview from './DailyOverview'

const AdminDashboard = () => {
  return (
    <div className='p-10 pt-5'>
      <Grid container spacing={2}>
        <Grid className="shadow-lg shadow-gray-500" size={{xs:12, md:4}}>
          <Achivement/>
        </Grid>
        <Grid className="shadow-lg shadow-gray-500" size={{xs:12, md:8}}>
          <DailyOverview/>
        </Grid>
      <Grid className="shadow-lg shadow-gray-500" size={{xs:12, md:12}}>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <OrdersTable/>
        </div>

      </Grid>
      <Grid className="shadow-lg shadow-gray-500" size={{xs:12, md:12}}>
        <ProductsTable/>
      </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashboard