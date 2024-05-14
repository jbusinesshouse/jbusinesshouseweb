import React, { useEffect, useState } from 'react'
import '../assets/styles/checkout.css'
import Header from '../components/Header'
import panjabi1 from '../assets/images/panjabi1.jpeg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Checkout = () => {
    const [productData, setProductData] = useState({})
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("Dhaka")
    const [deliveryCharge, setDeliveryCharge] = useState(0)
    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState({})
    const [finalPrice, setFinalPrice] = useState(0)


    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getStoredProduct = JSON.parse(localStorage.getItem("selectedProduct"))
        setProductData(getStoredProduct)
        console.log(getStoredProduct);
        // setDeliveryCharge(100)
        setSize(getStoredProduct.selectedSize)
        setQuantity(getStoredProduct.quantity)
        setProduct(getStoredProduct.product)
        const mainProduct = getStoredProduct.product
        // setFinalPrice((getStoredProduct.product?.hasWholesale ? Number(getStoredProduct.quantity) < Number(getStoredProduct.product?.wholeMinQuan) ? Number(getStoredProduct.product?.disPrice) : Number(getStoredProduct.product?.wholePrice) : Number(getStoredProduct.product?.disPrice)) * Number(getStoredProduct.quantity))
        const getFinalPrice = mainProduct?.disPrice && mainProduct?.disPrice > 0 && getStoredProduct?.quantity < mainProduct?.wholeMinQuan ? mainProduct?.disPrice : mainProduct?.wholePrice
        setFinalPrice(getFinalPrice * getStoredProduct.quantity)
    }, [])


    const handleSubmit = () => {
        setIsLoading(true)
        if (name && phone && address && city && district) {
            axios.post(`${process.env.REACT_APP_API_KEY}/order/saveOrder`, { name, phone, address, city, district, deliveryCharge, size, quantity, product, finalPrice }).then(res => {
                setIsLoading(false)
                navigate("/thank-you")
            }).catch(err => {
                setIsLoading(false)
                window.alert('Something went wrong!')
                console.log(err);
            })
        }
    }

    return (
        <div className='checkout'>
            <Header />
            {
                isLoading && <Loading />
            }
            <section className="checkoutWrap">
                <div className="container">
                    <div className="checkLeft">
                        <h2>Shipping information</h2>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="checkInp">
                                <label htmlFor="name">Full name</label>
                                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="checkInp">
                                <label htmlFor="phone">Phone number</label>
                                <input type="text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="checkInp">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="checkInp">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" id="city" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className="checkInp">
                                <label htmlFor="district">District</label>
                                <select name="district" id="district" value={district} onChange={e => setDistrict(e.target.value)}>
                                    <option value="Bagerhat">Bagerhat</option>
                                    <option value="Bandarban">Bandarban</option>
                                    <option value="Barguna">Barguna</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Bhola">Bhola</option>
                                    <option value="Bogura">Bogura (Bogra)</option>
                                    <option value="Brahmanbaria">Brahmanbaria</option>
                                    <option value="Chandpur">Chandpur</option>
                                    <option value="Chattogram">Chattogram (Chittagong)</option>
                                    <option value="Chuadanga">Chuadanga</option>
                                    <option value="Comilla">Comilla (Cumilla)</option>
                                    <option value="Cox's Bazar">Cox's Bazar</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Dinajpur">Dinajpur</option>
                                    <option value="Faridpur">Faridpur</option>
                                    <option value="Feni">Feni</option>
                                    <option value="Gaibandha">Gaibandha</option>
                                    <option value="Gazipur">Gazipur</option>
                                    <option value="Gopalganj">Gopalganj</option>
                                    <option value="Habiganj">Habiganj</option>
                                    <option value="Jamalpur">Jamalpur</option>
                                    <option value="Jashore">Jashore (Jessore)</option>
                                    <option value="Jhalokati">Jhalokati</option>
                                    <option value="Jhenaidah">Jhenaidah</option>
                                    <option value="Joypurhat">Joypurhat</option>
                                    <option value="Khagrachari">Khagrachari</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Kishoreganj">Kishoreganj</option>
                                    <option value="Kurigram">Kurigram</option>
                                    <option value="Kushtia">Kushtia</option>
                                    <option value="Lakshmipur">Lakshmipur</option>
                                    <option value="Lalmonirhat">Lalmonirhat</option>
                                    <option value="Madaripur">Madaripur</option>
                                    <option value="Magura">Magura</option>
                                    <option value="Manikganj">Manikganj</option>
                                    <option value="Meherpur">Meherpur</option>
                                    <option value="Moulvibazar">Moulvibazar</option>
                                    <option value="Munshiganj">Munshiganj</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Naogaon">Naogaon</option>
                                    <option value="Narail">Narail</option>
                                    <option value="Narayanganj">Narayanganj</option>
                                    <option value="Narsingdi">Narsingdi</option>
                                    <option value="Natore">Natore</option>
                                    <option value="Netrokona">Netrokona</option>
                                    <option value="Nilphamari">Nilphamari</option>
                                    <option value="Noakhali">Noakhali</option>
                                    <option value="Pabna">Pabna</option>
                                    <option value="Panchagarh">Panchagarh</option>
                                    <option value="Patuakhali">Patuakhali</option>
                                    <option value="Pirojpur">Pirojpur</option>
                                    <option value="Rajbari">Rajbari</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangamati">Rangamati</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Satkhira">Satkhira</option>
                                    <option value="Shariatpur">Shariatpur</option>
                                    <option value="Sherpur">Sherpur</option>
                                    <option value="Sirajganj">Sirajganj</option>
                                    <option value="Sunamganj">Sunamganj</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Tangail">Tangail</option>
                                    <option value="Thakurgaon">Thakurgaon</option>
                                </select>
                            </div>
                        </form>
                        <h2>Delivery option</h2>
                        <div className="deliveryWrap">
                            <p>Cash on delivery</p>
                            <p>ফোন কল এর মাদ্ধমে কন্ফার্ম করা হবে</p>
                        </div>

                        <button className="placeOrderBtn" onClick={handleSubmit}>Place Order</button>
                    </div>
                    <div className="checkRight">
                        <h2>Order summary</h2>
                        <div className="orderSumWrap">
                            <div className="orderSumLeft">
                                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${productData.product?.image}`} alt="" />
                            </div>
                            <div className="orderSumRight">
                                <h3>{productData.product?.name}</h3>
                                <h4>&#2547; {finalPrice / quantity}</h4>
                                <p>Size: {productData.selectedSize}</p>
                                <p>Quantity: {productData.quantity}</p>
                            </div>
                        </div>

                        <div className="checkCal">
                            <div className="checkCalRow">
                                <p>Subtotal</p>
                                <h3>&#2547; {finalPrice}</h3>
                            </div>
                            {/* <div className="checkCalRow">
                                <p>Shipping</p>
                                <h3>&#2547; {deliveryCharge}</h3>
                            </div> */}
                        </div>
                        {/* <div className="checkTotal">
                            <h3>Total</h3>
                            <h3>&#2547; {finalPrice + deliveryCharge}</h3>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout