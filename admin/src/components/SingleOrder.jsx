import React from 'react'
import storeImg from '../assets/images/store.webp'


const SingleOrder = () => {
    return (
        <div className='singleOrder'>
            <img src={storeImg} alt="" />
            <div className="orderText">
                <h3>Men's T-shirt black color</h3>
                <p>Qty: 5</p>
                <p>Total Price: &#2547; 3000</p>
                <p>Buyer Name: MD. Amir Khan</p>
                <p>Buyer Phone: 019834895348</p>
                <p>Buyer Address: Ghonapara bazar, Kashiani, Gopalganj</p>
                <p>Buyer District: Gopalganj</p>
                <p>Status: Pending</p>
            </div>
        </div>
    )
}

export default SingleOrder