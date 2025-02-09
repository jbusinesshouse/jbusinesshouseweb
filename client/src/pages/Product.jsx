import React, { useEffect, useState } from 'react'
import '../assets/styles/product.css'
import Header from '../components/Header'
import product1 from '../assets/images/panjabi1.jpeg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const Product = () => {
    const [productData, setProductData] = useState({})
    const [productImages, setProductImages] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")
    const [storeInfo, setStoreInfo] = useState({})
    const productId = window.location.pathname.split("/product/")[1]
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axios.get(`${process.env.REACT_APP_API_KEY}/product/getSingle/${productId}`).then(res => {
            // console.log(res.data);
            setProductData(res.data)
            setProductImages([res.data.image, ...res.data.subImages])
            if (res.status === 200) {
                axios.get(`${process.env.REACT_APP_API_KEY}/user/getUser/${res.data.storeId}`).then(res => {
                    // console.log(res.data);
                    setStoreInfo(res.data)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }, [productId])
    console.log(productImages);


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

    const images = [
        "https://via.placeholder.com/600x400/ff7f7f/333333?text=Slide+1",
        "https://via.placeholder.com/600x400/77ff77/333333?text=Slide+2",
        "https://via.placeholder.com/600x400/7777ff/333333?text=Slide+3",
        "https://via.placeholder.com/600x400/ffff77/333333?text=Slide+4",
    ];

    return (
        <div className='product'>
            <Header />
            <section className='singleProductWrap'>
                <div className="container">
                    <div className="productLeft">
                        {/* <img src={`${process.env.REACT_APP_API_KEY}/uploads/${productData.image}`} alt="" className='bigImg' /> */}
                        <Swiper
                            style={{ width: "100%", padding: "5px", border: "1px solid #ccc" }}
                            spaceBetween={10}
                            slidesPerView={1}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Thumbs, Navigation]}
                            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                            className='firstSlider'
                        >
                            {productImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={`${process.env.REACT_APP_API_KEY}/uploads/${img}`} alt={`Slide ${index + 1}`} className='bigImg' />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </Swiper>


                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={5}
                            watchSlidesProgress
                            modules={[Thumbs]}
                            style={{ marginTop: "10px", width: "100%" }}
                        >
                            {productImages.map((img, index) => (
                                <SwiperSlide key={index} style={{ cursor: "pointer" }}>
                                    <img src={`${process.env.REACT_APP_API_KEY}/uploads/${img}`} alt={`Thumb ${index + 1}`} style={{ width: "100%", height: "80px", objectFit: "cover" }} className='smallImg' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
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