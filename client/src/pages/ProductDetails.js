import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails({ products, cart }) {
    
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
        const isItemInCart = cart.some(cartItem => 
            cartItem.product_id === product.id && cartItem.size === size
        );

        if (isItemInCart) {
            fetch(`/update_cart_item/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemToAdd)
            })
            .then(() => navigate('/cart'))
        }
        else 
        {
            fetch("/add_to_cart", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemToAdd)
            })
            .then(() => navigate('/cart'))
    }}

    function handleChange(e) {
        setSize(e.target.value)
    }

    return (
    
        <div className="product-details-container">
            <div className="product-image-container">
                <img id='details-image' src={product.image_path} alt={product.name} />
            </div>
            <div className="product-options-container">
            <h1 className="product-details-name">{product.name}</h1>
            <p className="product-details-description">{product.description}</p>
            <hr className="details-separator-line"></hr>
            <h2 className="product-details-price">${product.price}</h2>
            {cat === 1 ? 
            <select onChange={handleChange} 
                id="dropdown">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
            </select> : 
            null}
            <div className="quantity-control">
            <button className="details-quantity-button" onClick={() => handleDecrease()}>-</button>
            <h2 className="quantity-display"> {amount} </h2>
            <button className="details-quantity-button" onClick={() => handleIncrease()}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleClick}>Add to cart</button>
            </div>
        </div>
       
    )
}

export default ProductDetails;
