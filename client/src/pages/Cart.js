import { useEffect } from "react";   
import { Link } from "react-router-dom";

import ProductInCartCard from "../components/ProductInCartCard";

function Cart({ cart, setCart }) {

    useEffect(() => {
        fetch("/get_cart_items")
            .then(r => r.json())
            .then(data => setCart(data))
            .catch(error => {
                console.error("Error fetching cart items:", error);
            });
    }, [setCart]);

    const items = cart.map(item => 
    <ProductInCartCard key={item.id} {...item} cart={cart} setCart={setCart} />
    )
    
    return (
        <div>
            <h1 className="cart-header" >Cart</h1>
            <Link id='continue-shop-link' to='/store'>
            <button className="continue-shop" >Continue shopping</button>
            </Link>
             {cart.length === 0 ?   
                <h1 className="cart-empty">Your cart is empty!</h1>
                : 
                <div>
                {items}
                <Link id='checkout-link' to='/checkout'>
                <button className="checkout-btn" >Checkout</button>
                </Link>
                </div>
            }
        </div>   
    )
}

export default Cart;