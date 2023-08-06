import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductDetails({ products }) {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    const [size, setSize] = useState('')
    const [amount, setAmount] = useState(1)

    const cat = product.category_id

    function handleIncrease() {
        setAmount(prev => prev += 1)

    }

    function handleDecrease() {
        amount > 1 ? setAmount(prev => prev -= 1) : setAmount(1)
    }

    const itemToAdd = {
        product_id: product.id,
        quantity: amount,
        price: product.price,
        size: size
    }

    
    function handleClick() {
        fetch("/add_to_cart", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToAdd)
        })
        

    };

    function handleChange(e) {
        setSize(e.target.value)
        
    }
    console.log(size)

    return (
        <div className="product-details-page">
            {cat === 1 ? 
            <select onChange={handleChange} id = "dropdown">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">XL</option>
            </select> : 
            <select>
                <option value="N/A">N/A</option>
            </select>}
            <img src={product.image_path} alt={product.name} className="product-img-page"/>
            <h1 className="product-name-page">{product.name}</h1>
            <h2 className="product-price-page">{product.price}</h2>
            <p className="product-description-page">{product.description}</p>
            <button className="add-to-cart-btn" onClick={handleClick}>Add to cart</button>
            <button onClick={() => handleIncrease()}>+</button>
            <div> {amount} </div>
            <button onClick={() => handleDecrease()}>-</button>
        </div>
    )
}

export default ProductDetails;
