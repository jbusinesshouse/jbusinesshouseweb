import React, { useContext, useState } from 'react'
import '../assets/styles/login.css'
import Header from '../components/Header'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'

const Login = () => {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const { setUserVal, login, logout } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (phone && password) {
            setIsLoading(true)
            axios.post(`${process.env.REACT_APP_API_KEY}/auth/validate`, { phone, password }).then(res => {
                console.log(res.data);
                setIsLoading(false)
                localStorage.setItem("user", JSON.stringify(res.data))
                setUserVal(res.data)
                login()
                navigate("/")
            }).catch(err => {
                logout()
                console.log(err);
                setIsLoading(false)
                window.alert("Something went wrong!")
            })
        } else {
            window.alert("Please fill all input fields!")
        }
    }
    return (
        <div className='login'>
            <Header />
            {
                isLoading && <Loading />
            }
            <section className="logForm">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="logInpItem">
                            <label htmlFor="phone">Enter your phone number</label>
                            <input type="text" name='phone' id='phone' onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="logInpItem">
                            <label htmlFor="password">Enter your password</label>
                            <input type="password" name='password' id='password' onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login