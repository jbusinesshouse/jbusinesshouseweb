import React from 'react'
import '../assets/styles/thankYou.css'
import { Link } from 'react-router-dom'

const ThankYou = () => {
    return (
        <div className='thankYou'>
            <div className="container">
                <h1>Thank you for your order</h1>
                <p>We're processing your order.</p>
                <Link to={'/'}>Return to home</Link>
            </div>
        </div>
    )
}

export default ThankYou