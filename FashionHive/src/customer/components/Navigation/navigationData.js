export const navigation = {
    categories: [
      {
        id: 'women',
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc: 'https://static.nextdirect.com/resource/blob/960746/b18e6246d2277bed0e4969f1d14183ef/wwr-new-in-mb-data.jpg',
            imageAlt: 'Womens New Arrivals.',
          },
          {
            name: 'Basic Tees',
            href: '/',
            imageSrc: 'https://images-na.ssl-images-amazon.com/images/I/71EEg1CEWVL._AC_UL600_SR600,600_.jpg',
            imageAlt: 'Womens Tshirt.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'clothing',
            items: [
              { name: 'Kurtas', id: 'womens_kurta' },
              { name: 'Tops', id:"top", href: `{women/clothing/tops}` },
              { name: 'Dresses', id:"womens_dress", href: '#' },
              { name: 'Women Jeans', id: 'womens_jeans' },
              { name: 'Lengha Choli', id: 'lengha_choli' },
              { name: 'Sweaters', id: 'womens_sweater' },
              { name: 'T-Shirts', id: 'womens_tshirt' },
              { name: 'Jackets', id: 'womens_jacket' },
              { name: 'Gouns', id: 'gouns' },
              { name: 'Sarees', id: 'saree' },
            ],
          },
          {
            id: 'accessories',
            name: 'accessories',
            items: [
              { name: 'Watches', id: 'womens_watch' },
              { name: 'Bags', id: 'womens_bag' },
              { name: 'Wallets', id: 'womens_wallet' },
              { name: 'Sunglasses', id: 'womens_sunglasse' },
              { name: 'Hats', id: 'womens_hat' },
              { name: 'Belts', id: 'womens_belt' },
            ],
          },
        ],
      },
      {
        id: 'men',
        name: 'Men',
        featured: [
          {
            name: 'New Arrivals',
            id: '#',
            imageSrc: 'https://static.nextdirect.com/resource/blob/715650/aa0a828e61712111049df8774c15b8d7/new-in-data.jpg',
            imageAlt: 'Mens New Arrivals.',
          },
          {
            name: 'Artwork Tees',
            id: '#',
            imageSrc: 'https://m.media-amazon.com/images/I/61OZlUzwkWL.jpg',
            imageAlt:
              'Mens Tshirt.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'clothing',
            items: [
              { name: 'Mens Kurtas', id: 'mens_kurta' },
              { name: 'Shirt', id: 'mens_shirt' },
              { name: 'Men Jeans', id: 'men_jeans' },
              { name: 'Sweaters', id: '#' },
              { name: 'T-Shirts', id: 'mens_tshirt' },
              { name: 'Jackets', id: 'mens_jacket' },
              { name: 'Activewear', id: 'mens_activewear' },
              
            ],
          },
          {
            id: 'accessories',
            name: 'accessories',
            items: [
              { name: 'Watches', id: 'mens_watch' },
              { name: 'Sunglasses', id: 'mens_sunglass' },
              { name: 'Wallets', id: 'mens_wallet' },
              { name: 'Bags', id: 'mens_bag' },
              { name: 'Hats', id: 'mens_hat' },
              { name: 'Belts', id: 'mens_belt' },
            ],
          },
        ],
      },
    ],
    pages: [
      { name: 'Company', id: '/request' },
      { name: 'Stores', id: '/request' },
    ],
  }
