import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/orders.css'
import Header from '../components/Header'
import panjabi1 from '../assets/images/panjabi1.jpeg'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Loading from '../components/Loading'

const Orders = () => {
    const [orderData, setOrderData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { userVal } = useContext(AuthContext)
    useEffect(() => {
        setIsLoading(true)
        if (userVal?._id) {
            axios.get(`${process.env.REACT_APP_API_KEY}/order/getOrdersByStoreId/${userVal._id}`).then(res => {
                setIsLoading(false)
                const revData = res.data.reverse()
                console.log(revData);
                setOrderData(revData)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [userVal])

    const handleCheck = (e, item) => {
        setIsLoading(true)
        axios.put(`${process.env.REACT_APP_API_KEY}/order/updateOrder/${item._id}`, { ...item, status: e.target.checked ? "Completed" : "Pending" }).then(res => {
            // console.log(res.data);
            setIsLoading(false)
            const updatedOrder = orderData.map(val => {
                return val._id === res.data._id ? res.data : val
            })
            setOrderData(updatedOrder)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
            window.alert('Something went wrong!')
        })
    }

    return (
        <div className='orders'>
            <Header />
            {
                isLoading && <Loading />
            }
            <section className="orderMain">
                <div className="container">
                    <h2>All Orders</h2>
                    <div className="userOrderWrap">
                        {
                            orderData.length > 0 && orderData.map((val, i) => {
                                return (
                                    <div className="singleOrder" key={i}>
                                        <img src={`${process.env.REACT_APP_API_KEY}/uploads/${val.product.image}`} alt="" />
                                        <div className="orderText">
                                            <h3>{val.product.name}</h3>
                                            <h4><span>Buyer:</span> {val.name}</h4>
                                            <h4><span>Phone:</span> {val.phone}</h4>
                                            <p><span>Size:</span> {val.size}</p>
                                            <p><span>qty:</span> {val.quantity}</p>
                                            <p><span>Total Price:</span> &#2547; {val.finalPrice}</p>
                                        </div>
                                        <div className="orderCompleted">
                                            <div className="completeToggle">
                                                <label htmlFor={`comp${i}`}>Mark as completed</label>
                                                <input type="checkbox" name={`comp${i}`} id={`comp${i}`} checked={val.status === "Pending" ? false : true} onChange={(e) => handleCheck(e, val)} />
                                            </div>
                                            <p className={val.status === "Pending" ? 'pending' : 'completed'}>{val.status}</p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Orders