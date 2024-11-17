import React, { useEffect, useState } from 'react'
import '../assets/styles/sellerProfile.css'
import Header from '../components/Header'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SingleProduct from '../components/SingleProduct'

const SellerProfile = () => {
    const location = useLocation()
    const storeId = location.pathname.split("seller/")[1]
    const [sellerWarn, setSellerWarn] = useState(false)
    const [userData, setUserData] = useState({})
    const [userProduct, setUserProduct] = useState([])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/user/getUser/${storeId}`).then(res => {
            console.log(res.data);
            setUserData(res.data)
            setSellerWarn(false)

            axios.get(`${process.env.REACT_APP_API_KEY}/product/getByStore?id=${storeId}`).then(res => {
                console.log(res);
                // console.log(res.data);
                const revData = res.data.reverse()
                setUserProduct(revData)
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
            setSellerWarn(true)
        })
    }, [storeId])

    return (
        <div className='sellerProfile'>
            <Header />
            <section className="sellerProWrap">
                <div className="container">
                    {
                        sellerWarn ?
                            <h2 style={{ textAlign: "center" }}>Seller not found!</h2> :
                            <>
                                <div className="profileTop">
                                    <img src={`${process.env.REACT_APP_API_KEY}/uploads/${userData?.storePhoto}`} alt="" className="storeImg" />
                                    <h2>{userData?.storeName}</h2>
                                </div>

                                <div className="profileInfo">
                                    <h3>Seller Information</h3>
                                    <div className="proInfoRow">
                                        <h4>Full name</h4>
                                        <p>{userData?.name}</p>
                                    </div>
                                    <div className="proInfoRow">
                                        <h4>Phone number</h4>
                                        <p>{userData?.phone}</p>
                                    </div>
                                    {
                                        userData?.email &&
                                        <div className="proInfoRow">
                                            <h4>Email</h4>
                                            <p>{userData?.email}</p>
                                        </div>
                                    }
                                    <div className="proInfoRow">
                                        <h4>Store name</h4>
                                        <p>{userData?.storeName}</p>
                                    </div>
                                </div>

                                <div className="profilePro">
                                    <div className="profileProHeading">
                                        <h3>All products of the seller</h3>
                                    </div>
                                    <div className="productWrap">
                                        {
                                            userProduct.length > 0 && userProduct.slice(0, 16).map((val, i) => {
                                                return <SingleProduct data={val} key={i} />
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </section>
        </div>
    )
}

export default SellerProfile