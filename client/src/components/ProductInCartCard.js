import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function ProductInCartCard({ cart, setCart, size, id, name, price, image_path, quantity, category_id }) {
    const [editSize, setEditSize] = useState(size);
    const [editAmount, setEditAmount] = useState(quantity)
    const [inEdit, setInEdit] = useState(false)

    const editedItem = {
        quantity: editAmount,
        size: editSize,
    }

    function handleDelete() {
        fetch(`/delete_cart_item/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete item from cart');
            }
            setCart(cart.filter(item => item.id !== id));
        })
        .catch(error => {
            console.error('There was a problem with the delete operation:', error.message);
        });
    }

    function handlePatch() {
    fetch(`/update_cart_item/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedItem)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => setCart(data))
    .catch(error => {
        console.error('There was a problem with the PATCH request:', error);
    });
}


function handleIncrease() {
    setEditAmount(prev => prev + 1);
}

function handleDecrease() {
    setEditAmount(prev => prev > 1 ? prev - 1 : 1);
}
    function handleChange(e) {
        setEditSize(e.target.value)
    }

    return (
        <div>
        {!inEdit ? (
        <div className="cart-product-card">
            <div className="edit-icon-container">
                <FaRegEdit onClick={() => setInEdit(prev => !prev)} />
            </div>
            <img className="cart-product-image" src={image_path} alt={name} />
            <div className="cart-product-card-content">
            <h1 className="cart-product-name">{name}</h1>
            {size !== '' ? (
                 <div className="cart-product-size">{size}</div>
                ) : (
                <div className="cart-product-size-placeholder"></div>
                )}
            <h2 className="cart-product-price">${price}</h2>
            <h3 className="cart-product-quantity">{quantity}</h3>
            </div>
            <button className="cart-remove-button" onClick={handleDelete}>Remove</button>
        </div>
        ) : ( 
            <div className="cart-product-card">
            <img className="cart-product-image" src={image_path} alt={name} />
            <div className="cart-product-card-content">
            <h1 className="cart-product-name">{name}</h1>
                {category_id === 1 ? 
            <select onChange={handleChange} 
                value={editSize}
                id="dropdown">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
            </select> : 
            <div className="cart-product-size-placeholder"></div>}
            <h2 className="cart-product-price">${price}</h2>
            <div className="quantity-control">
            <button className="details-quantity-button" onClick={() => handleDecrease()}>-</button>
            <h2 className="quantity-display"> {editAmount} </h2>
            <button className="details-quantity-button" onClick={() => handleIncrease()}>+</button>
            </div>
            </div>
            <button className="cart-remove-button" onClick={handlePatch}>Save</button>
            </div>
        )}
        </div>
    );
    }


        


export default ProductInCartCard;
