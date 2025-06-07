import { Avatar, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { findProducts } from '../../state/Product/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

const ProductsTable = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(store => store.products)


const [pageNumber, setPageNumber] = useState(1);



  // console.log("products in admin products table :",products)



  const handlePaginationChange = (event,value) => {
    setPageNumber(value);
  }



  useEffect(()=>{
        const data = {
          category: "",
          colors: [],
          sizes: [],
          minPrice : 0,
          maxPrice : 1000000000000,
          minDiscount: 0,
          sort: "price_low",
          pageNumber: pageNumber,
          pageSize: 10,
          stock: "",
        }
    
  
        dispatch(findProducts(data));
  },[pageNumber,dispatch])
  return (
    <div className='p-5'>

      <Card className='mt-2'>
      < CardHeader title="Products"/>

      <TableContainer sx = {{bgcolor:"#f5f2f2"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Tittle</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Discount Percent</TableCell>
            <TableCell align="left">Discounted Price</TableCell>
            <TableCell align="left">Quantity</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {products.content?.map((item) => (
            <TableRow
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.discountedPersent}</TableCell>
              <TableCell align="left">{item.discountedPrice}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <section className='w-full px=[3.5rem]'>
                <div className='px-4 py-5 flex justify-center'>
                  <Pagination count={products?.totalPages} onChange={handlePaginationChange}
                  sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#ca8a04',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#ca8a04',
                      },
                    },
                  }}  />
    
                </div>
              </section>

      </Card>
    </div>
  )
}

export default ProductsTable



