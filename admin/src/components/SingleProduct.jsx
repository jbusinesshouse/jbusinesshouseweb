import React from 'react'
import storeImg from '../assets/images/shirt.webp'
import star from '../assets/images/star.png'
import starFill from '../assets/images/star-fill.png'
import delIcon from '../assets/images/bin.png'

const SingleProduct = () => {
    return (
        <div className='singleProduct'>
            <img src={storeImg} alt="" />
            <div className="starWrap">
                <img src={star} alt="" className="starImg" />
            </div>
            <img src={delIcon} alt="" className="proDel" />
            <div className="productText">
                <h3>Men's shirt black color cottom</h3>
                <p><span>&#2547; 1500</span> &#2547; 900</p>
                <p>Store: America Cloth Store</p>
                <p>Store Owner: Abdur Rahim</p>
            </div>
        </div>
    )
}

export default SingleProduct