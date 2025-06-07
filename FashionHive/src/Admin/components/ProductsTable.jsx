import { Avatar, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../state/Product/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProductsTable = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(store => store.products)


  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1
  const [pageNumber, setPageNumber] = useState(initialPage);

  const [selectedCategory, setSelectedCategory] = useState("");
const [searchQuery, setSearchQuery] = useState("");






  // console.log("products in admin products table :", products)

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }


  const handlePaginationChange = (event, value) => {
    setPageNumber(value);


    navigate(`?page=${value}`);
  }



  useEffect(() => {
    const data = {
      category: selectedCategory || searchQuery || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: pageNumber,
      pageSize: 10,
      stock: "",
    }


    dispatch(findProducts(data));
  }, [pageNumber, selectedCategory, searchQuery,dispatch])
  return (
    <div className='p-5'>

      <Card className='mt-2'>
        < CardHeader title="Products AdminPanel" />
        <div className='flex gap-5 p-5'>
  <TextField
    select
    label="Filter by Category"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    fullWidth
  >
    <MenuItem value="">All Categories</MenuItem>
    {Array.from(new Set(products.content?.flatMap(item => item.category.name))).map((category) => (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    ))}
  </TextField>

  <TextField
    label="Search Category"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    fullWidth
  />
</div>

        <TableContainer sx={{ bgcolor: "#f5f2f2" }} component={Paper}>
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


                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.content?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item?.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left">{item?.title}</TableCell>
                  <TableCell align="left">{item?.category?.name}</TableCell>
                  <TableCell align="left">{item?.price}</TableCell>
                  <TableCell align="left">{item?.discountedPersent}</TableCell>
                  <TableCell align="left">{item?.discountedPrice}</TableCell>
                  <TableCell align="left">{item?.quantity}</TableCell>

                  <TableCell align="left">
                    <Button onClick={() => handleProductDelete(item._id)} variant='outlined' color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <section className='w-full px=[3.5rem]'>
          <div className='px-4 py-5 flex justify-center'>
            <Pagination count={products?.totalPages}   page={pageNumber} onChange={handlePaginationChange}
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#ca8a04',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ca8a04',
                  },
                },
              }} />

          </div>
        </section>

      </Card>
    </div>
  )
}

export default ProductsTable



