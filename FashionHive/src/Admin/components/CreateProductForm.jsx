import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


const initialsizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 }
];


const categoryData = {
  Men: {
    clothing: [
      { name: 'Mens Kurtas', id: 'mens_kurta' },
      { name: 'Shirt', id: 'mens_shirt' },
      { name: 'Men Jeans', id: 'men_jeans' },
      { name: 'Sweaters', id: 'mens_sweater' },
      { name: 'T-Shirts', id: 'mens_tshirt' },
      { name: 'Jackets', id: 'mens_jacket' },
      { name: 'Activewear', id: 'mens_activewear' },
    ],
    accessories: [
      { name: 'Watches', id: 'mens_watch' },
      { name: 'Wallets', id: 'mens_wallet' },
      { name: 'Bags', id: 'mens_bag' },
      { name: 'Sunglasses', id: 'mens_sunglass' },
      { name: 'Hats', id: 'mens_hat' },
      { name: 'Belts', id: 'mens_belt' },
    ],
  },
  Women: {
    clothing: [
      { name: 'Kurtas', id: 'womens_kurta' },
      { name: 'Tops', id: 'top' },
      { name: 'Dresses', id: 'womens_dress' },
      { name: 'Women Jeans', id: 'womens_jeans' },
      { name: 'Lengha Choli', id: 'lengha_choli' },
      { name: 'Sweaters', id: 'womens_sweater' },
      { name: 'T-Shirts', id: 'womens_tshirt' },
      { name: 'Jackets', id: 'womens_jacket' },
      { name: 'Gouns', id: 'gouns' },
      { name: 'Sarees', id: 'saree' },
    ],
    accessories: [
      { name: 'Watches', id: 'womens_watch' },
      { name: 'Wallets', id: 'womens_wallet' },
      { name: 'Bags', id: 'womens_bag' },
      { name: 'Sunglasses', id: 'womens_sunglasse' },
      { name: 'Hats', id: 'womens_hat' },
      { name: 'Belts', id: 'womens_belt' },
    ],
  },
};

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountedPersent: "",
    size: initialsizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };
  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData))
    // console.log("product data in create product form", productData)
  }

  return (
    <div className='createProductContainer p-10'>
      <Typography
        variant='h3'
        sx={{ textAlign: "center" }}
        className='py-10 text-center'
      >
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}
        className='createProductContainer min-h-screen'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              name='imageUrl'
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Brand"
              name='brand'
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Title"
              name='title'
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Color"
              name='color'
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Quantity"
              name='quantity'
              value={productData.quantity}
              onChange={handleChange}
              type='number'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Price"
              name='price'
              value={productData.price}
              onChange={handleChange}
              type='number'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Discounted Price"
              name='discountedPrice'
              value={productData.discountedPrice}
              onChange={handleChange}
              type='number'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>

            <TextField
              fullWidth
              label="Discounted Percentage"
              name='discountedPersent'
              value={productData.discountedPersent}
              onChange={handleChange}
              type='number'
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"

              >
                {/* "topLevelCategory": "Men",
          "secondLevelCategory": "Clothing",
          "thirdLevelCategory": "mens_kurta", */}
                <MenuItem value="Men">Mens</MenuItem>
                <MenuItem value="Women">Womens</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
                disabled={
                  !productData.topLevelCategory || !productData.secondLevelCategory
                }
              >
                {categoryData[productData.topLevelCategory] &&
                  categoryData[productData.topLevelCategory][productData.secondLevelCategory]?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid size={{ xs: 12 }} >
            <TextField
              fullWidth
              id='outlined-multiline-static'
              label="Description"
              multiline
              name='description'
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>

          {productData.size.map((size, index) => (
            <Grid container spacing={3} key={size.name}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Size"
                  name='name'
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Quantity"
                  name='size_quantity'
                  type='number'
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}

          <Grid size={{ xs: 12 }}>
            <Button
              variant='contained'
              sx={{ p: 1.8 }}
              className='py-20'
              size='large'
              type='submit'
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )





}

export default CreateProductForm