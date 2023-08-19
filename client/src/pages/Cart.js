import ProductInCartCard from "../components/ProductInCartCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Cart({ cart, setCart }) {

    const navigate = useNavigate()
    const length = cart.length

    useEffect(() => {
        fetch("/get_cart_items")
        .then(r => r.json())
        .then(data => setCart(data))
    }, [])
    

    const items = cart.map(item => 
    <ProductInCartCard key={item.id} {...item} cart={cart} setCart={setCart} />
    )
    
    return (
       
        <div>
            <h1 className="cart-header" >Cart</h1>
            <button className="continue-shop" onClick={() => navigate('/store')} >Continue shopping</button>
             {length === 0 ?   
                <h1 className="cart-empty">Your Cart is Empty!</h1>
                : 
                <div>{items}
                <button className="checkout-btn" onClick={() => navigate('/checkout')}>Checkout</button></div>
            }
          
        </div>
        
    )
    
}

export default Cart;