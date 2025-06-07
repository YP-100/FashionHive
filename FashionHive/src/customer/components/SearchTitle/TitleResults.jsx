import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';

import { findProducts } from '../../../state/Product/Action';
import ProductCard from '../Product/ProductCard';

const TitleResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector(store => store.products);
  const [pageNumber, setPageNumber] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const titleQuery = searchParams.get('title') || '';

  useEffect(() => {
    if (titleQuery) {
      const data = {
        title: titleQuery,
        category: "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 1000000000000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: pageNumber,
        pageSize: 15,
        stock: "",
      };
      // console.log("Search request data:", data);
      dispatch(findProducts(data));
    }
  }, [titleQuery, pageNumber, dispatch]);

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
    navigate(`/products/search?title=${titleQuery}&page=${value}`);
  };

  return (
    <div className="bg-white p-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Search Results for "{titleQuery}"
          </h1>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="lg:col-span-4 w-full">
            {products?.content?.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center bg-white">
                  {products.content.map((item, i) => (
                    <ProductCard product={item} key={i} />
                  ))}
                </div>

                <div className="px-4 py-5 flex justify-center">
                  <Pagination 
                    count={products?.totalPages} 
                    page={pageNumber} 
                    onChange={handlePaginationChange}
                    sx={{
                      '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: '#ca8a04',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#ca8a04',
                        },
                      },
                    }} 
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">
                  No products found matching your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TitleResults;