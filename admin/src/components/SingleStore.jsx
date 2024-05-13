import React from 'react'
import storeImg from '../assets/images/store.webp'

const SingleStore = () => {
  return (
    <div className='singleStore'>
        <img src={storeImg} alt="" />
        <div className="storeText">
            <h3>America Choth Store</h3>
            <p>MD. Amir Khan</p>
            <p>019834895348</p>
            <p>Ghonapara bazar, Kashiani, Gopalganj</p>
        </div>
    </div>
  )
}

export default SingleStore