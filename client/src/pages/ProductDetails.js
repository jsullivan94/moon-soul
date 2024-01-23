import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails({ products, cart }) {
    
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const [size, setSize] = useState("");
    const [amount, setAmount] = useState(1)
    const [mensInventory, setMensInventory] = useState({});
    const [womensInventory, setWomensInventory] = useState({});
    const [gender, setGender] = useState('Mens')
    const navigate = useNavigate()

    useEffect(() => {
        if (product?.category_id === 1) {
            fetch(`/size_inventory/${id}/mens`)
                .then(response => response.json())
                .then(data => {
                    const inventory = {};
                    data.forEach(item => {
                        inventory[item.size.name] = { quantity: item.quantity, id: item.size.id };
                    });
                    setMensInventory(inventory);
                    const mensFirstAvailableSize = Object.keys(inventory).find(sizeName => inventory[sizeName].quantity > 0);
                    if (mensFirstAvailableSize) {
                        setSize(mensFirstAvailableSize);
                    }
                    
                })
                .catch(error => console.error('Error fetching mens inventory:', error));

            fetch(`/size_inventory/${id}/womens`) 
                .then(response => response.json())
                .then(data => {
                    const inventory = {};
                    data.forEach(item => {
                        inventory[item.size.name] = { quantity: item.quantity, id: item.size.id };
                    });
                    setWomensInventory(inventory);
                })
                .catch(error => console.error('Error fetching womens inventory:', error));
        }
    }, [id, product?.category_id]);

    const currentInventory = gender === 'Mens' ? mensInventory : womensInventory;

    useEffect(() => {
        const firstAvailableSize = Object.keys(currentInventory).find(sizeName => currentInventory[sizeName].quantity > 0);
        if (firstAvailableSize) {
            setSize(firstAvailableSize);
        }
    }, [gender, currentInventory]);
    
    if (!product) {
        return <div>Loading...</div>;
    }

    function getSizeIdFromName(sizeName) {
        const selectedInventory = gender === 'Mens' ? mensInventory : womensInventory;
        return selectedInventory[sizeName] ? selectedInventory[sizeName].id : null;
    }

   

    const isInStock = sizeName => {
        const stockAvailable = currentInventory[sizeName] && currentInventory[sizeName].quantity > 0;
        console.log(`Size: ${sizeName}, In Stock: ${stockAvailable}`);
        return stockAvailable;
    };

    const cat = product.category_id

    
    function handleIncrease() {
        const selectedInventory = gender === 'Mens' ? mensInventory : womensInventory;
        const availableStock = selectedInventory[size];
    
        if (amount < availableStock) {
            setAmount(prevAmount => prevAmount + 1);
        } else {
            alert("Sorry, you've reached the maximum available stock for this size.");
        }
    }

    function handleDecrease() {
        amount > 1 ? setAmount(prev => prev -= 1) : setAmount(1)
    }

    const itemToAdd = {
        product_id: product.id,
        quantity: amount,
        price: product.price,
        size_id: getSizeIdFromName(size),
        image_path: product.image_path
    }

    function handleClick() {
        const isItemInCart = cart.some(cartItem => 
            cartItem.product_id === product.id && cartItem.size_id === getSizeIdFromName(size)
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

    function handleChangeSize(e) {
        setSize(e.target.value)
    }

    function handleChangeGender(e) {
        setGender(e.target.value);
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
            <>
            <select onChange={handleChangeGender}
            id="gender-dropdown">
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
            </select>
            <select onChange={handleChangeSize} id="dropdown">
    {Object.keys(currentInventory).map(sizeName => (
        <option key={sizeName} value={sizeName} disabled={!isInStock(sizeName)}>{sizeName}</option>
    ))}
</select>
            </>
            : 
            null}
            <div className="quantity-control">
            <button className="details-quantity-button" onClick={() => handleDecrease()}>-</button>
            <h2 className="quantity-display"> {amount} </h2>
            <button className="details-quantity-button" onClick={() => handleIncrease()}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleClick} >Add to cart</button>
            </div>
        </div>
       
    )
}

export default ProductDetails;
