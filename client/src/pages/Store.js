import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function Store ( { products, setCart, cart }) {

    
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