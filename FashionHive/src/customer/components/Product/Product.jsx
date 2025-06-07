'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { filters, singleFilter } from './FilterData'
import { FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../state/Product/Action'


const sortOptions = [
  { name: 'None', value: '', current: false },
  { name: 'Price: Low to High', value: 'price_low', current: false },
  { name: 'Price: High to Low', value: 'price_high', current: false },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  const param = useParams();

  const dispatch = useDispatch();

  const { products } = useSelector(store => store.products)


  // console.log("products in product page", products)

  const decodedQueryString = decodeURIComponent(location.search)
  const searchParamms = new URLSearchParams(decodedQueryString)
  const colorValue = searchParamms.get("color");
  const sizeValue = searchParamms.get("size");
  const priceValue = searchParamms.get("price");
  const discount = searchParamms.get("discount");
  const sortValue = searchParamms.get("sort");
  // const pageNumber = searchParamms.get("page") || 1;
  const pageNumber = parseInt(searchParamms.get("page")) || 1;
  const stock = searchParamms.get("stock");


  const handlePaginationChange = (event, value) => {

    const searchParamms = new URLSearchParams(location.search)

    searchParamms.set("page", value.toString())
    // searchParamms.set("page", value)
    const query = searchParamms.toString();
    navigate({ search: `?${query}` })
  }



  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    let filterValue = searchParams.getAll(sectionId)
    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
      filterValue = filterValue[0].split(',').filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId)
      }
    }
    else {
      filterValue.push(value)
    }
    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(','));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` })
    // else{
    //   searchParams.delete(sectionId); 
    // }
  }

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(sectionId, e.target.value)
    const query = searchParams.toString();
    navigate({ search: `?${query}` })
  }



  const handleSort = (value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === '') {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", value);
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const [minPrice, maxPrice] = priceValue === null ? [0, 10000] : priceValue.split('-').map(Number);

    const data = {
      category: param.levelThree,
      colors: colorValue || [],
      sizes: sizeValue || [],
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber,
      pageSize: 12,
      stock: stock,
    }


    dispatch(findProducts(data));

  }, [param.levelThree,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
    dispatch
  ])




  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* mobile filters */}

              <div>

                <form>
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white p-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="p-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    defaultValue={option.value}
                                    checked={searchParamms.getAll(section.id).includes(option.value) ||
                                      searchParamms.getAll(section.id).some(param =>
                                        param.split(',').includes(option.value))}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-yellow-600 checked:bg-yellow-600 indeterminate:border-yellow-600 indeterminate:bg-yellow-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
                <form className>
                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white p-3 text-sm text-gray-400 hover:text-gray-500">
                          {/* <span className="font-medium text-gray-900">{section.name}</span> */}
                          <FormLabel sx={{ color: "black" }} className="font-medium text-gray-900" id="demo-radio-buttons-group-label">{section.name}</FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="p-6">
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={searchParamms.get(section.id) || ""}
                              name="radio-buttons-group"
                            >
                              {section.options.map((option) => (
                                <FormControlLabel
                                  onChange={(e) => {
                                    if (e.target.value === '') {
                                      // Clear the filter when "None" is selected
                                      const searchParams = new URLSearchParams(location.search);
                                      searchParams.delete(section.id);
                                      const query = searchParams.toString();
                                      navigate({ search: `?${query}` });
                                    } else {
                                      handleRadioFilterChange(e, section.id);
                                    }
                                  }}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                  key={option.value}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {sortValue === 'price_low' ? 'Price: Low to High' :
                      sortValue === 'price_high' ? 'Price: High to Low' : 'Sort'}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <button
                            onClick={() => handleSort(option.value)}
                            className={classNames(
                              focus ? 'bg-gray-100' : '',
                              sortValue === option.value ? 'font-medium text-gray-900' : 'text-gray-500',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">


              {/* Filters */}


              <div>
                <div className='hidden lg:flex justify-between items-center'>
                  <h1 className='text-lg opacity-50 font-bold'>Filters</h1>
                  <FilterAltIcon className='opacity-50' />
                </div>
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    defaultValue={option.value}
                                    checked={searchParamms.getAll(section.id).includes(option.value) ||
                                      searchParamms.getAll(section.id).some(param =>
                                        param.split(',').includes(option.value))}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-yellow-600 checked:bg-yellow-600 indeterminate:border-yellow-600 indeterminate:bg-yellow-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
                <form className="hidden lg:block">
                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          {/* <span className="font-medium text-gray-900">{section.name}</span> */}
                          <FormLabel sx={{ color: "black" }} className="font-medium text-gray-900" id="demo-radio-buttons-group-label">{section.name}</FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={searchParamms.get(section.id) || ""}
                              name="radio-buttons-group"
                            >
                              {section.options.map((option) => (
                                <FormControlLabel
                                  onChange={(e) => {
                                    if (e.target.value === '') {
                                      // Clear the filter when "None" is selected
                                      const searchParams = new URLSearchParams(location.search);
                                      searchParams.delete(section.id);
                                      const query = searchParams.toString();
                                      navigate({ search: `?${query}` });
                                    } else {
                                      handleRadioFilterChange(e, section.id);
                                    }
                                  }}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                  key={option.value}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className='flex flex-wrap justify-center bg-white'>
                  {products && products?.content?.map((item, i) => (
                    <ProductCard product={item} key={i} />))}
                </div>
              </div>
            </div>
          </section>

          <section className='w-full px=[3.5rem]'>
            <div className='px-4 py-5 flex justify-center'>
              <Pagination count={products?.totalPages} page={pageNumber} onChange={handlePaginationChange}
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
        </main>
      </div>
    </div>
  )
}