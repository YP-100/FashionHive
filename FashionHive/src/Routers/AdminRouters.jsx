import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin.jsx'

const AdminRouters = () => {
  return (
    <div>
      
        <Routes>
            <Route path='/*' element={<Admin />}> </Route>
        </Routes>
    </div>
  )
}

export default AdminRouters