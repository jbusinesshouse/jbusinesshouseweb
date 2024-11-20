import React, { useContext, useState } from 'react'
import '../assets/styles/signup.css'
import Header from '../components/Header'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'

const Signup = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [storeName, setStoreName] = useState("")
    const [storeAddress, setStoreAddress] = useState("")
    const [storePhoto, setStorePhoto] = useState(null)
    const [password, setPassword] = useState("")
    const [refNumber, setRefNumber] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const { setUserVal, login, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name && phone && storeName && storeAddress && storePhoto && password) {
            setIsLoading(true)
            const fileExtension = storePhoto.name.split('.').pop();
            const currentDate = new Date();
            const uniqueFilename = `${storePhoto.name.split('.')[0]}-${currentDate.getTime()}.${fileExtension}`;
            const imageFile = new FormData()
            imageFile.append("image", storePhoto, uniqueFilename)
            const formattedValue = {
                name,
                phone,
                ...(email ? { email } : {}),
                storeName,
                storeAddress,
                storePhoto,
                uniqueFilename,
                password,
                ...(refNumber ? { refNumber } : {})
            }
            axios.post(`${process.env.REACT_APP_API_KEY}/uploadImage`, imageFile).then(res => {
                axios.post(`${process.env.REACT_APP_API_KEY}/user/saveUser`, formattedValue).then(res => {
                    // console.log(res.data);
                    setIsLoading(false)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    setUserVal(res.data)
                    login()
                    navigate("/")
                }).catch(err => {
                    logout()
                    console.log(err);
                    setIsLoading(false)
                    window.alert("Something went wrong! Try using a different phone number!")
                })
            }).catch(err => {
                console.log(err);
            })
        } else {
            window.alert("Please fill in all requried fields!")
        }

    }

    return (
        <div className='signup'>
            <Header />
            {
                isLoading && <Loading />
            }
            <section className="signForm">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="signInpItem">
                            <label htmlFor="name">Enter your full name</label>
                            <input type="text" name='name' id='name' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="phone">Enter your phone number</label>
                            <input type="text" name='phone' id='phone' value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="email">Enter your email (optional)</label>
                            <input type="text" name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="store">Enter your store name</label>
                            <input type="text" name='store' id='store' value={storeName} onChange={e => setStoreName(e.target.value)} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="storeAdd">Enter your store address</label>
                            <input type="text" name='storeAdd' id='storeAdd' value={storeAddress} onChange={e => setStoreAddress(e.target.value)} />
                        </div>
                        <div className="signInpItem signInpImgItem">
                            <label htmlFor="storeImg">Enter your store photo</label>
                            <input type="file" accept=".jpg, .jpeg, .png, .webp" name='storeImg' id='storeImg' onChange={e => setStorePhoto(e.target.files[0])} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="password">Enter your password</label>
                            <input type="text" name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="signInpItem">
                            <label htmlFor="refNumber">Enter referral number (optional)</label>
                            <input type="text" name='refNumber' id='refNumber' value={refNumber} onChange={e => setRefNumber(e.target.value)} />
                        </div>
                        <button>Signup</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Signup