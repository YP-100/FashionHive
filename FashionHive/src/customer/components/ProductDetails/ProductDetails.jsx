'use client'

import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { Box, Button, LinearProgress } from '@mui/material'
import { Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import { Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts, findProductsById} from '../../../state/Product/Action.js'
import { addItemToCart } from '../../../state/Cart/Action.js'

import toast from 'react-hot-toast'
import { getProductReviews } from '../../../state/Reviews/Action.js'
import { getProductRatings } from '../../../state/Ratings/Action.js'
import ProductCard from '../Product/ProductCard.jsx'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Best Quality Gaurentee',
    'Free home delivery for orders above ₹2000',
    'Pre-washed & pre-shrunk',
    'Genuine brands',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams()
  const dispatch = useDispatch()
  const products = useSelector(store => store.products.product)
  const reviews = useSelector((store) => store.review)
  const ratings = useSelector((store) => store.rating)


  // const allProducts = useSelector(store => store.products);
  const { products: allProductsData } = useSelector(store => store.products);
const allProducts = allProductsData?.content || [];
  const [similarProducts, setSimilarProducts] = useState([]);

  
  // console.log("products in productsdetails : ", products)
  // console.log("reviews in productsdetails : ", reviews)

  const [sizeError, setSizeError] = useState(false);
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    if (sizeError) setSizeError(false);
  }
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.custom((t) => (
        <div
          className={`bg-red-700 text-white px-4 py-2 rounded shadow-lg ${t.visible ? 'animate-enter' : 'animate-leave'
            }`}
        >
          Please Select a price  !!!!
        </div>
      ), {
        duration: 500
      }
      )
      return;
    }


    const data = { productId: params.productId, size: selectedSize.name }
    // console.log("handleaddtocart data : ", data);

    dispatch(addItemToCart(data))
    navigate('/cart')
  }


const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


  useEffect(() => {
    const data = { productId: params.productId }
    dispatch(findProductsById(data))
  }, [params.productId,dispatch])

  useEffect(() => {
    const data = { productId: params.productId }
    dispatch(getProductReviews(data))
  }, [params.productId,dispatch])
  
  useEffect(() => {
    // const data = { productId: params.productId }
    dispatch(getProductRatings(params.productId));
  }, [params.productId,dispatch])
  
  useEffect(() => {
    // Fetch all products when component mounts
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 100, // Fetch enough to find similar products
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  // console.log("allProducts in productsdetails : ", allProducts)


  useEffect(() => {
    if (products && allProducts.length > 0) {
      const currentCategory = products.category?.name;
      if (currentCategory) {
        // Filter products from same category excluding current product
        const sameCategoryProducts = allProducts.filter(
          product => 
            product.category?.name === currentCategory && 
            product._id !== products._id
        );
        
        // Shuffle the array and take first 4
        const shuffledProducts = shuffleArray(sameCategoryProducts);
        setSimilarProducts(shuffledProducts.slice(0, 20));
      }
    }
  }, [products, allProducts]);

  // console.log("similarProducts in productsdetails : ", similarProducts)

  // console.log("ratings in productsdetails : ", ratings)


const calculateAverageRating = () => {
  if (!ratings.ratings || ratings.ratings.length === 0) return 0;
  
  const sum = ratings.ratings.reduce((total, rating) => total + rating.ratings, 0);
  const average = sum / ratings.ratings.length;
  return Math.round(average * 10) / 10;
};

const averageRating = calculateAverageRating();
const totalRatings = ratings.ratings?.length || 0;
const totalReviews = reviews.productReviews?.length || 0;

// console.log("averageRating in productdetails : ", averageRating)
// console.log("totalRatings in productdetails : ", totalRatings)


  return (
    <div className="bg-white lg:px-20">



      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className='overflow-hidden rounded-lg h-[45rem] -w-[40rem]'>
              <img
                src={products?.imageUrl}
                alt={product.images[0].alt}
                className="block size-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1  px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-left text-lg lg:text-xl font-semibold text-gray-900">
                {products?.brand}
              </h1>
              <h1 className="text-left text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {products?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className='flex space-x-5 text-lg lg:text-xl text-gray-900'>
                <p className='font-semibold'>
                  {products?.discountedPrice}
                </p>
                <p className='opacity-50 line-through'>
                  {products?.price}
                </p>
                <p className='text-green-600 font-semibold'>
                  {products?.discountedPersent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className='flex items-center space-x-3'>
                  <Rating name="read-only" value={averageRating} readOnly precision={0.5} />
                  <p className='text-sm opacity-50'>{totalRatings} Ratings</p>
                  <p className='ml-3 text-sm font-medium text-yellow-600 hover:text-yellow-500'>{totalReviews} Reviews</p>
                </div>
              </div>

              <form className="mt-10">


                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-yellow-600">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={handleSizeChange}
                      // onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                            selectedSize === size ? 'border-yellow-600' : 'border-gray-300'
                          )}

                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-yellow-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button onClick={handleAddToCart} variant="contained" sx={{ px: "2rem", py: "1rem", marginTop: "2rem", bgcolor: "#ca8a04" }}>
                  Add To Bag
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">


              {/* Description and details */}
              <div>
                <h3 className="sr-only">{products?.description}</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{products?.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/*rating and reviews*/}
        <section>
          <h1 className='font-semibold text-lg pb-4'>Recent Reviews & Rating </h1>

          <div className='border p-5'>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 , sm: 7 }}>
                <div className='space-y-5'>
                  {reviews.productReviews?.map((item, i) => <ProductReviewCard key={i} review={item} allratings={ratings.ratings}/>)}
                </div>
              </Grid>

              <Grid size={{ xs: 12 , sm: 5 }} >
                <h1 className='text-xl font-semibold pb-2'>Product Ratings</h1>
                <div className='flex items-center space-x-3'>
                  <Rating name='read-only' value={averageRating} precision={0.5} readOnly />
                  <p className='opacity-60'>{totalRatings}</p>
                </div>

                <Box className="mt-5 space-y-3">

                  <Grid container alignItems="center" gap={2}>

                    <Grid size={{ xs: 2 }}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress sx={{
                        bgcolor: "#d0d0d0", borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': {
                          backgroundColor: '	#4CAF50'
                        }
                      }}
                        variant="determinate"
                        value={60} />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress sx={{
                        bgcolor: "#d0d0d0", borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': {
                          backgroundColor: '#8BC34A'
                        }
                      }}
                        variant="determinate"
                        value={50} />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress sx={{
                        bgcolor: "#d0d0d0", borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': {
                          backgroundColor: '#FFC107'
                        }
                      }}
                        variant="determinate"
                        value={40} />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Average</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress sx={{
                        bgcolor: "#d0d0d0", borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': {
                          backgroundColor: '	#FF9800'
                        }
                      }}
                        variant='determinate'
                        value={30} />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Poor</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress sx={{
                        bgcolor: "#d0d0d0", borderRadius: 4, height: 7, '& .MuiLinearProgress-bar': {
                          backgroundColor: '#F44336'
                        }
                      }}
                        variant="determinate"
                        value={20} />
                    </Grid>
                  </Grid>


                </Box>
              </Grid>

            </Grid>

          </div>
        </section>

        {/*related product*/}

        <section className='pt-10'>

          <h1 className='py-5 text-xl font-bold'>Similar Products</h1>

          <div className='flex flex-wrap space-y-5'>
            {similarProducts.map((item, i) => <ProductCard key={i} product={item} />)}
          </div>

        </section>

      </div>
    </div>
  );
}
