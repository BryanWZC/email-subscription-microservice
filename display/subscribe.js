import React from "react";


function Subscribe(props){
    return(
        <div className='sub-modal-wrapper'>
            <CancelIcon />
            <SubscribeImage />
            <SubscribeDesc />
        </div>
    );
}

function SubscribeImage(){
    const size = '/432x656';
    const src = 'https://source.unsplash.com/Mv9hjnEUHR4' + size;
    return(
        <React.Fragment>
            <img src={src}></img>
        </React.Fragment>
    );
}

function SubscribeDesc(){
    return(
        <div className='sub-desc-wrapper montserrat'>
                <h1 className='sub-desc-title semi-bold fs-large dark-grey'>
                    Lovable dog images in your inbox
                </h1>
                <h2 className='sub-desc medium fs-medium dark-grey'>
                    Sign up to receive cute dog images, grooming tips and free resources plus 10% on all of our products.
                </h2>
                <form className='sub-form' action='/submit' method='post'>
                    <input className='sub-input montserrat medium fs-small dark-grey' type='email' id='email' name='email' placeholder='Email address' pattern='[\w\d.-_]+@[\w\d.-_]+\.[\w]+$' required />
                    <input className='sub-btn montserrat semi-bold fs-regular dark-grey' type='submit' value='Subscribe'/>  
                </form>
                    <p className='sub-end-text semi-bold fs-small dark-grey'>
                        No spam included
                    </p>
            </div>
    );
}

function CancelIcon(){
    return(
        <div className='cancel-icon'>
            <div className='bar1'></div>
            <div className='bar2'></div>
        </div>
    );
}

export default Subscribe;