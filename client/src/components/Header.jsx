import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/header.css'
import logo from '../assets/images/logo-new.png'
import search from '../assets/images/search-icon.png'
import user from '../assets/images/user.png'
import bellIcon from '../assets/images/bell.png'
import cart from '../assets/images/shopping-cart.png'
import signout from '../assets/images/signout.png'
import menuIcon from '../assets/images/menu.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [overTog, setOverTog] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [inpVal, setInpVal] = useState("")
    const { userVal, isAuthenticated, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoggedIn(isAuthenticated)
    }, [isAuthenticated])

    const handleSearch = (e) => {
        e.preventDefault()
        if (inpVal) {
            navigate(`/search/${inpVal}`)
        }
    }

    const handleLogout = () => {
        setOverTog(false)
        logout()
    }
    return (
        <header>
            <div className="container">
                <div className="headerLeft">
                    <Link to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="headerRight">
                    <ul className={overTog ? "active" : ""}>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/shop'}>Shop</Link>
                        </li>
                        {
                            isLoggedIn &&
                            <li>
                                <button className='logoutBtn menuLogout' onClick={handleLogout}>
                                    Logout
                                    <img src={signout} alt="" />
                                </button>
                            </li>
                        }
                    </ul>
                    <div className="headerBtns">
                        <button onClick={() => setIsSearch(true)}>
                            <img src={search} alt="" />
                        </button>
                        {
                            isLoggedIn ?
                                <>
                                    <Link to={'/profile'}>
                                        <button>
                                            <img src={user} alt="" />
                                        </button>
                                    </Link>
                                    <Link to={`/orders/${userVal._id}`}>
                                        <button className='orderSeeBtn'>View All Orders</button>
                                    </Link>
                                    <button className='logoutBtn mainLogout' onClick={handleLogout}>
                                        Logout
                                        <img src={signout} alt="" />
                                    </button>
                                </>
                                :
                                <>
                                    <Link to={"/login"}>Login</Link>
                                    <Link to={"/signup"}>Signup</Link>
                                </>
                        }
                        <img src={menuIcon} alt="" className='menuIcon' onClick={() => setOverTog(true)} />
                        {/* <button>
                            <img src={cart} alt="" />
                        </button> */}
                    </div>
                </div>
            </div>
            <div className={overTog ? "overlay active" : "overlay"} onClick={() => setOverTog(false)}></div>
            {
                isSearch &&
                <div className="searchWrap">
                    <div className="searchOverlay" onClick={() => setIsSearch(false)} />
                    <div className="searchCon">
                        <h2>Search for product</h2>
                        <form onSubmit={handleSearch}>
                            <input type="text" value={inpVal} onChange={e => setInpVal(e.target.value)} />
                            <button>Search</button>
                        </form>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header