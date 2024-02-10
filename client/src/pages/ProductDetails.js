import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails({ products, cart }) {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [size, setSize] = useState("");
    const [amount, setAmount] = useState(1);
    const [inventory, setInventory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (product?.category_id === 1) {
            fetch(`/size_inventory/${id}`)
                .then(response => response.json())
                .then(data => {
                    const newInventory = {};
                    data.forEach(item => {
                        newInventory[item.size.name] = { quantity: item.quantity, id: item.size.id };
                    });
                    setInventory(newInventory);
                    const firstAvailableSize = Object.keys(newInventory).find(sizeName => newInventory[sizeName].quantity > 0);
                    if (firstAvailableSize) {
                        setSize(firstAvailableSize);
                    }
                })
                .catch(error => console.error('Error fetching inventory:', error));
        } else if (product?.category_id === 2) {
                        fetch(`/products/${id}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                const inventory = data.inventory[0].quantity;
                                setInventory(inventory);  
                            })
                            .catch(error => console.error('Error fetching inventory:', error));
                    }
    }, [id, product?.category_id]);
    
    if (!product) {
                return <div>Loading...</div>;
            }

    function getSizeIdFromName(sizeName) {
        return inventory[sizeName] ? inventory[sizeName].id : null;
    }

    const isInStock = sizeName => inventory[sizeName] && inventory[sizeName].quantity > 0;

    function handleIncrease() {
        if (product.category_id === 1) {
            const availableStock = inventory[size];
            if (amount < availableStock.quantity) {
                setAmount(prevAmount => prevAmount + 1);
            } else {
                alert("Sorry, you've reached the maximum available stock for this size.");
            }} else if (product.category_id === 2) {
                if (amount < inventory) {
                    setAmount(prevAmount => prevAmount + 1);
                } else {
                    alert("Sorry, you've reached the maximum available stock for this item.");
                }
            }
    }

    function handleDecrease() {
        amount > 1 ? setAmount(prev => prev - 1) : setAmount(1);
    }

    const itemToAdd = {
        product_id: product.id,
        quantity: amount,
        price: product.price,
        size_id: getSizeIdFromName(size),
        image_path: product.image_path
    };

    function handleClick() {
        const isItemInCart = cart.some(cartItem => cartItem.product_id === product.id && cartItem.size_id === getSizeIdFromName(size));
        const endpoint = isItemInCart ? `/update_cart_item/${id}` : "/add_to_cart";
        const method = isItemInCart ? 'PATCH' : 'POST';

        fetch(endpoint, {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToAdd)
        }).then(() => navigate('/cart'));
    }

    function handleChangeSize(e) {
        setSize(e.target.value);
        setAmount(() => 1);
    }

    if (!product) {
        return <div>Loading...</div>;
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
                {product.category_id === 1 && (
                    <select onChange={handleChangeSize} id="size-dropdown">
                        {Object.keys(inventory).map(sizeName => (
                            <option key={sizeName} value={sizeName} disabled={!isInStock(sizeName)}>{sizeName}</option>
                        ))}
                    </select>
                )}
                <div className="quantity-control">
                    <button className="details-quantity-button" onClick={handleDecrease}>-</button>
                    <h2 className="quantity-display">{amount}</h2>
                    <button className="details-quantity-button" onClick={handleIncrease}>+</button>
                </div>
                <button className="add-to-cart-btn" onClick={handleClick}>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductDetails;

