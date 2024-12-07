import React, { useEffect, useState } from 'react'
import '../assets/styles/product.css'
import Header from '../components/Header'
import product1 from '../assets/images/panjabi1.jpeg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Product = () => {
    const [productData, setProductData] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")
    const [storeInfo, setStoreInfo] = useState({})
    const productId = window.location.pathname.split("/product/")[1]

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axios.get(`${process.env.REACT_APP_API_KEY}/product/getSingle/${productId}`).then(res => {
            console.log(res.data);
            setProductData(res.data)
            if (res.status === 200) {
                axios.get(`${process.env.REACT_APP_API_KEY}/user/getUser/${res.data.storeId}`).then(res => {
                    console.log(res.data);
                    setStoreInfo(res.data)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }, [productId])

    const quantityDec = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }
    const quantityInc = () => {
        setQuantity(prev => prev + 1)
    }
    const handleQuantity = (e) => {
        if (e.target.value >= 1) {
            setQuantity(e.target.value)
        } else {
            setQuantity(1)
        }
    }

    const handleBuy = () => {
        if (productData.disPrice && productData.disPrice > 0) {
            localStorage.setItem("selectedProduct", JSON.stringify({ product: { ...productData }, selectedSize: selectedSize ? selectedSize : "N/A", quantity }))
            navigate(`/checkout/${productId}`)
        } else if (quantity >= productData.wholeMinQuan) {
            localStorage.setItem("selectedProduct", JSON.stringify({ product: { ...productData }, selectedSize: selectedSize ? selectedSize : "N/A", quantity }))
            navigate(`/checkout/${productId}`)
        }
    }

    return (
        <div className='product'>
            <Header />
            <section className='singleProductWrap'>
                <div className="container">
                    <div className="productLeft">
                        <img src={`${process.env.REACT_APP_API_KEY}/uploads/${productData.image}`} alt="" width="500" />
                    </div>
                    <div className="productRight">
                        <Link to={`/seller/${storeInfo.id}`}>
                            <div className="proStore">
                                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${storeInfo.storePhoto}`} alt="" />
                                <h3>{storeInfo.storeName}</h3>
                            </div>
                        </Link>

                        <h1>
                            {productData.name}
                        </h1>
                        <div className="productPrice">
                            <p className="proRePrice">&#2547; {productData.price}</p>
                            <p className="proDisPrice">&#2547; {productData.wholePrice}</p>
                        </div>
                        <div className="productDes">
                            <p>
                                {productData.description}
                            </p>
                        </div>

                        <div className="proSize">
                            <h3>SIZE</h3>
                            <ul>
                                {
                                    productData.size && productData.size.length > 0 && productData.size.map((val, i) => {
                                        return <li key={i} onClick={() => setSelectedSize(val)} className={val === selectedSize ? "active" : ""}>{val}</li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className="disTable">
                            <div className="disTabHeading">
                                <div className="disTabItem">Min Quantity</div>
                                {/* <div className="disTabItem">Discount (%)</div> */}
                                <div className="disTabItem">Price</div>
                            </div>
                            {
                                productData.disPrice && productData.disPrice > 0 &&
                                <div className={quantity > productData.wholeMinQuan - 1 ? "disTabRow" : "disTabRow active"}>
                                    <div className="disTabItem">1 - {productData.wholeMinQuan - 1}</div>
                                    {/* <div className="disTabItem">--</div> */}
                                    <div className="disTabItem">&#2547; {productData.disPrice}</div>
                                </div>
                            }
                            <div className={quantity < productData.wholeMinQuan ? "disTabRow" : "disTabRow active"}>
                                <div className="disTabItem">{productData.wholeMinQuan}+</div>
                                {/* <div className="disTabItem">30 %</div> */}
                                <div className="disTabItem">&#2547; {productData.wholePrice}</div>
                            </div>
                        </div>

                        <div className="proAction">
                            <div className="countWrap">
                                <button onClick={quantityDec}>-</button>
                                <input type="text" value={quantity} onChange={e => handleQuantity(e)} />
                                <button onClick={quantityInc}>+</button>
                            </div>
                            <button className="buyBtn" onClick={handleBuy}>BUY NOW</button>
                        </div>

                        <div className="proCat">
                            <span>Category:</span> <p>{productData.category ? productData.category : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product