import ProductInCartCard from "../components/ProductInCartCard";
import { useState, useEffect } from "react";



function Cart() {

    const [cart, setCart] = useState([])  

    useEffect(() => {
        fetch("/get_cart_items")
        .then(r => r.json())
        .then(data => setCart(data))
    }, [])
    

    const items = cart.map(item => 
    <ProductInCartCard key={item.id} {...item} cart={cart} setCart={setCart} />
    )
    
    return (
        <div>{items}</div>
    )
    
}

export default Cart;