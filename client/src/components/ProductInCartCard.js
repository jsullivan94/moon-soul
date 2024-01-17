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
    fetch(`/update_cart_item_from_cart/${id}`, {
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
    .then(data => {
        const updatedCart = cart.map(item => 
            item.id === data.id ? data : item
        );
        setCart(updatedCart);
        setInEdit((prev) => !prev)
    })
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
                {category_id === 1 ? 
            <select onChange={handleChange} 
                value={editSize}
                id="dropdown-edit">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
            </select> : 
            <div className="cart-product-size-placeholder-edit"></div>}
            <h2 className="cart-product-price-edit">${price}</h2>
            <div className="quantity-control-edit">
            <button className="details-quantity-button-edit" onClick={() => handleDecrease()}>-</button>
            <h2 className="quantity-display-edit"> {editAmount} </h2>
            <button className="details-quantity-button-edit" onClick={() => handleIncrease()}>+</button>
            </div>
            </div>
            <button className="cart-save-button" onClick={handlePatch}>Save</button>
            </div>
        )}
        </div>
    );
    }


        


export default ProductInCartCard;
