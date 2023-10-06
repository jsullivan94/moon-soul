function ProductInCartCard({ cart, setCart, size, id, name, price, image_path, quantity }) {

    function handleClick() {
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

    return (
        <div className="cart-product-card">
            <img className="cart-product-image" src={image_path} alt={name} />
            <h1 className="cart-product-name">{name}</h1>
            <h3 className="cart-product-size">{size}</h3>
            <h2 className="cart-product-price">${price}</h2>
            <h3 className="cart-product-quantity">{quantity}</h3>
            <button className="remove-button" onClick={handleClick}>Remove</button>
        </div>
    );
} 

export default ProductInCartCard;
