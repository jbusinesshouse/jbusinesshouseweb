import React from 'react'
import SingleStore from '../components/SingleStore'
import { Link } from 'react-router-dom'
import SingleProduct from '../components/SingleProduct'
import SingleOrder from '../components/SingleOrder'

const Home = () => {
    return (
        <section className='home'>
            <h1><span>Total Sell:</span> &#2547; 560000</h1>
            <div className="dividerPart">
                <h2>Orders Overview</h2>
                <div className="storeWrap">
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                    <SingleOrder />
                </div>
                <Link to={'/order'}>See all</Link>
            </div>
            <div className="dividerPart">
                <h2>Stores Overview</h2>
                <div className="storeWrap">
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                    <SingleStore />
                </div>
                <Link to={'/store'}>See all</Link>
            </div>
            <div className="dividerPart">
                <h2>Products Overview</h2>
                <div className="storeWrap">
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                    <SingleProduct />
                </div>
                <Link to={'/product'}>See all</Link>
            </div>
        </section>
    )
}

export default Home