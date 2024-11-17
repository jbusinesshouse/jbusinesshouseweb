import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/profile.css'
import shopImg from '../assets/images/shop.jpg'
import Header from '../components/Header'
import panjabi1 from '../assets/images/panjabi1.jpeg'
import uploadIcon from '../assets/images/upload.png'
import deleteIcon from '../assets/images/bin.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Loading from '../components/Loading'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const [userProduct, setUserProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [profileWran, setProfileWarn] = useState(false)
    const { userVal } = useContext(AuthContext)
    useEffect(() => {
        setUserData(userVal)
        if (userVal) {
            axios.get(`${process.env.REACT_APP_API_KEY}/product/getByStore?id=${userVal._id}`).then(res => {
                console.log(res);
                // console.log(res.data);
                const revData = res.data.reverse()
                setProfileWarn(false)
                setUserProduct(revData)
            }).catch(err => {
                console.log(err);
            })
        } else {
            setProfileWarn(true)
        }
    }, [userVal])

    const handleDelete = (productId) => {
        // console.log(productId);
        setIsLoading(true)
        axios.delete(`${process.env.REACT_APP_API_KEY}/product/deleteProduct/${productId}`, { data: { storeId: userData._id } }).then(res => {
            // console.log(res.data);
            const filteredProducts = userProduct.filter(item => {
                return item._id !== res.data._id
            })
            setUserProduct(filteredProducts)
            setIsLoading(false)
        }).catch(err => {
            // console.log(err);
            setIsLoading(false)
            window.alert('Something went wrong!')
        })
    }
    return (
        <div className='profile'>
            <Header />
            {
                isLoading && <Loading />
            }
            <section className="profileWrap">
                <div className="container">
                    {profileWran ?
                        <h2>Login to see details!</h2> :
                        <>
                            <div className="profileTop">
                                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${userData?.storePhoto}`} alt="" className="storeImg" />
                                <h2>{userData?.storeName}</h2>
                            </div>
                            <div className="profileInfo">
                                <h3>Your personal Information</h3>
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
                                    <h3>Your all products</h3>
                                    <Link to={"/product-upload"}><img src={uploadIcon} alt="" /> Upload product</Link>
                                </div>
                                {
                                    userProduct.length > 0 && userProduct.map((val, i) => {
                                        return (
                                            <div className="singleProfilePro" key={i}>
                                                <div className="profileProLeft">
                                                    <img src={`${process.env.REACT_APP_API_KEY}/uploads/${val.image}`} alt="" />
                                                    <div className="profileProText">
                                                        <h4>{val.name}</h4>
                                                        <div className="profileProPrice">
                                                            <span>&#2547; {val.price}</span>
                                                            <span>&#2547; {val.disPrice}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="profileProRight">
                                                    <button onClick={() => handleDelete(val._id)}><img src={deleteIcon} alt="" /> Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </section>
        </div>
    )
}

export default Profile