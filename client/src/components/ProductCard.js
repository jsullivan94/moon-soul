function ProductCard( { id, name, price, description, image_path, cart, setCart }) {

    function handleClick() {
        fetch(`/products/${id}`)
        .then(r => r.json())
        .then(data => setCart([...cart, data]))
    }
    
    return (
        <div className="product-card">
            <img src={image_path} alt={name} className="product-img"/>
            <h1 className="product-name">{name}</h1>
            <h2 className="product-price">{price}</h2>
            <button onClick={handleClick} className="cart-button">Add to Cart</button>
        </div>
    )
    } 
    
    export default ProductCard;
    