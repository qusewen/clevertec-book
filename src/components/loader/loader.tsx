import React from 'react'
import Lottie from "lottie-react";
import loader from '../../assets/constants/loader.json'
import './loader.scss'


export const Loader = () => (

<div data-test-id='loader' className='loader'>
    <div className="loader__body">
    <Lottie className='loader-item' animationData={loader} loop={true}/>
    </div>

</div>

)


