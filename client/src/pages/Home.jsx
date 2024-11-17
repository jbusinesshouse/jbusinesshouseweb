import React, { useEffect, useState } from 'react'
import '../assets/styles/home.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import SingleProduct from '../components/SingleProduct'
import axios from 'axios'
import Loading from '../components/Loading'

const Home = () => {
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_API_KEY}/product/getProducts`).then(res => {
      const revData = res.data.reverse()
      const revFeatured = revData.filter(val => {
        return val.isFeatured
      })

      setProducts(revData)
      setFeatured(revFeatured)
      setIsLoading(false)
    }).catch(err => {
      // console.log(err);
      setIsLoading(false)
    })
  }, [])
  return (
    <div className='home'>
      {
        isLoading &&
        <Loading />
      }
      <Header />
      <section className="banner">
        {/* <div className="container">
          <div className="bannerText">
            <h3>Exclusive Collections</h3>
            <h1>
              Welcome to J Business House
            </h1>
            <Link to={'/shop'}>Shop Now</Link>
          </div>
        </div> */}
      </section>

      <section className="featured">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="productWrap">
            {
              featured.length > 0 && featured.slice(0, 12).map((val, i) => {
                return <SingleProduct data={val} key={i} />
              })
            }
          </div>
        </div>
      </section>

      <section className="allProducts">
        <div className="container">
          <h2>All Products</h2>
          <div className="productWrap">
            {
              products.length > 0 && products.slice(0, 16).map((val, i) => {
                return <SingleProduct data={val} key={i} />
              })
            }
          </div>
          <Link to={'/shop'} className='seeAllBtn'>See All Product</Link>
        </div>
      </section>
    </div>
  )
}

export default Home