import React from 'react'
import '../assets/styles/singleProduct.css'
import panjabi1 from '../assets/images/panjabi1.jpeg'
import { Link } from 'react-router-dom'

const SingleProduct = ({ data }) => {
    return (
        <Link to={`/product/${data._id}`} className="singleProduct">
            <div className="productImg">
                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${data.image}`} alt="" />
            </div>
            <div className="productText">
                <h3>{data.name}</h3>
                <div className="priceWrap">
                    <p className="mainPrice">&#2547; {data.price}</p>
                    <p className="disPrice">&#2547; {data.disPrice}</p>
                </div>
            </div>
        </Link>
    )
}

export default SingleProduct