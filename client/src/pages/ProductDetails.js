import { useParams } from "react-router-dom";

function ProductDetails({ cart, setCart, products }) {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    const cartItemData = {
        product_id: 'product.id',
        quantity: 'product.quantity',
        price: 'product.price',
        cart_id: ''
    };

    function handleClick() {
        setCart([...cart, product]);

        fetch('/cart_items', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItemData), 
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="product-details-page">
            <img src={product.image_path} alt={product.name} className="product-img-page"/>
            <h1 className="product-name-page">{product.name}</h1>
            <h2 className="product-price-page">{product.price}</h2>
            <p className="product-description-page">{product.description}</p>
            <button className="add-to-cart-btn" onClick={handleClick}>Add to cart</button>
        </div>
    )
}

export default ProductDetails;
