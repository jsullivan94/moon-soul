import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function ProductDetails({ products }) {
    
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [size, setSize] = useState('')
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate()
    
    if (!product) {
        return <div>Loading...</div>;
    }

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
        size: size,
        image_path: product.image_path 
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
        .then(navigate('/cart'))
    };

    function handleChange(e) {
        setSize(e.target.value)
    }

    return (
        <div className="product-details-container">
        <div className="product-details-page">
            <img src={product.image_path} alt={product.name} className="product-img-page"/>
            <h1 className="product-name-page">{product.name}</h1>
            <h2 className="product-price-page">${product.price}</h2>
            <p className="product-description-page">{product.description}</p>
        </div>
        <div className="product-options-page">
            {cat === 1 ? 
            <select onChange={handleChange} id = "dropdown">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">XL</option>
            </select> : 
            null}
            <div className="quantity-control">
            <button className="quantity-button" onClick={() => handleDecrease()}>-</button>
            <div className="quantity-display"> {amount} </div>
            <button className="quantity-button" onClick={() => handleIncrease()}>+</button>
            <button className="add-to-cart-btn" onClick={handleClick}>Add to cart</button>
            </div>
        </div>
        </div>
    )
}

export default ProductDetails;
