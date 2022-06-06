import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from 'react'

import axios from 'axios'

import Loading from '../components/loading'

import numberFormat from '../utils/number-format'

export default function Home() {
  
  const [products, setProducts] = useState(null)

  useEffect(() => {
    axios.get('/api/get-products')
    .then(res => {
      console.log('products: ', res.data);
      setProducts(res.data.products)
    })
  }, [])


  if (!products) {
    return (
      <Loading/>
    )
  }

  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Shop</h3>
      <span className="mt-3 text-sm text-gray-500">{Object.keys(products).length} Produkte</span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {Object.keys(products).map((product, index) => {
          return (
            <Link key={index} href={`/products/${products[product].seo.permalink}`}>
              <a className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                {/* <div className="flex items-end justify-end h-56 w-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${products[product].attributes?.img1?.value ? products[product].attributes?.img1?.value : `https://dummyimage.com/500x500/000000/48ff00.png&text=${products[product]?.name.replace(/ /gi, '+')}`})`}}>
                </div> */}
                <div className="flex items-end justify-end h-56 w-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${`https://dummyimage.com/500x500/000000/48ff00.png&text=${products[product]?.name.replace(/ /gi, '+')}`})`}}>
                </div> 
                <div className="px-5 py-3">
                  <h3 className="text-gray-700">{products[product].name}</h3>
                  <span className="text-gray-500 mt-2">
                    {numberFormat(products[product].attributes.price.value)}
                  </span>
                </div>
              </a>
            </Link>
          )
        })}

      </div>
    </div>
  )
}
