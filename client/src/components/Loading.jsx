import React from 'react'
import loadingImg from '../assets/images/loading.gif'

const Loading = () => {
    return (
        <div className="loadingWrap">
            <img src={loadingImg} alt="" />
            <h2>Loading, Please wait!</h2>
        </div>
    )
}

export default Loading