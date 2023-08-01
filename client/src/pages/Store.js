import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function Store ( { setCart, cart }) {

    
    const [products, setProducts] = useState([])


    useEffect(() => {
        fetch('/products')
        .then(r => r.json())
        .then(r => setProducts(r))
    }, [])

    const items = products.map(product => {
        return(
            
        <ProductCard setCart={setCart} cart={cart} key={product.id} {...product} />
            
        )
    });


    
    return (
        
        <div className="products-grid">
            {items}
        </div>
    )
}

export default Store;