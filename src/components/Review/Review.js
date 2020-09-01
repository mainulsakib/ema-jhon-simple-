import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart]=useState([])
    const [orderPlaced,setOrderPlaced]=useState(false)


    const handlePlaceHolder=()=>{
      setCart([]);
      setOrderPlaced(true)
      processOrder();
    }
    
    const removeProduct=(productKeys)=>{
        console.log("remove Clicked ",productKeys);
         let newCart=cart.filter(pd=>pd.key !==productKeys);
        setCart(newCart);
        removeFromDatabaseCart(productKeys )
    }
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts =productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key]
            return product
        })
       setCart(cartProducts)
    },[])
    
    let thankyou
    if(orderPlaced)
   {
       thankyou=<img src={happyImage} alt=""/>
    }

    return (
        <div className="twinContainer">
        <div className='productContainer'>
        {
               cart.map(pd=><ReviewItem 
                removeProduct={removeProduct} 
                product={pd}></ReviewItem>)
           }
           {
               thankyou
           }
        </div>
        <div className='cartContainer'>
           <Cart cart={cart}>
               <button onClick={handlePlaceHolder } className="main-button">
                   Place Order 
               </button>
           </Cart>
        </div>
        </div>
    );
};

export default Review;