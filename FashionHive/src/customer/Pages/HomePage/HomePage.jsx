import React, { useEffect } from 'react'
import MainCarosel from '../../components/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectioncarosel/HomeSectionCarosel'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../state/Product/Action'

const HomePage = () => {
  const products = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 100,
      stock: "",
    }
    dispatch(findProducts(data))
  }, [dispatch])

  const filterByCategory = (categoryName) =>
    products.products?.content?.filter(
      (product) => product.category.name.toLowerCase() === categoryName.toLowerCase()
    ) || []

  // Clothing
  const mensKurta = filterByCategory("mens_kurta")
  const mensShirt = filterByCategory("mens_shirt")
  const womensTop = filterByCategory("top")
  const womensSaree = filterByCategory("saree")

  // Accessories
  const mensWatch = filterByCategory("mens_watch")
  const mensSunglass = filterByCategory("mens_sunglass")
  const womensWatch = filterByCategory("womens_watch")
  const womensBag = filterByCategory("womens_bag")

  return (
    <div>
      <MainCarosel />
      <div className="space-y-16 py-16 flex flex-col justify-center px-4 md:px-8 lg:px-16">
        {/* Men's Clothing */}
        {mensKurta.length > 0 && (
          <HomeSectionCarosel data={mensKurta} sectionName={"Men's Kurta"} />
        )}
        {mensShirt.length > 0 && (
          <HomeSectionCarosel data={mensShirt} sectionName={"Men's Shirt"} />
        )}

        {/* Women's Clothing */}
        {womensSaree.length > 0 && (
          <HomeSectionCarosel data={womensSaree} sectionName={"Women's Saree"} />
        )}
        {womensTop.length > 0 && (
          <HomeSectionCarosel data={womensTop} sectionName={"Women's Top"} />
        )}

        {/* Men's Accessories */}
        {mensWatch.length > 0 && (
          <HomeSectionCarosel data={mensWatch} sectionName={"Men's Watches"} />
        )}
        {mensSunglass.length > 0 && (
          <HomeSectionCarosel data={mensSunglass} sectionName={"Men's Sunglasses"} />
        )}

        {/* Women's Accessories */}
        {womensWatch.length > 0 && (
          <HomeSectionCarosel data={womensWatch} sectionName={"Women's Watches"} />
        )}
        {womensBag.length > 0 && (
          <HomeSectionCarosel data={womensBag} sectionName={"Women's Bags"} />
        )}
      </div>
    </div>
  )
}

export default HomePage
