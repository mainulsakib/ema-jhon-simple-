import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}=props.product
    return (
        <div style={{borderBottom:"1px solid lightGray"}} className="review-item">
            <h1 >this is review</h1>
            <h2 className='product-name'>{name} </h2>
    <p>quantity:{quantity}</p>
    <p><small>price:{price}</small></p>
    <button
    onClick={()=> props.removeProduct(key)}
    className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;