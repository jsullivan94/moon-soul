import { useState } from "react";

function InventoryCard( {id, product, size, quantity } ) {

    const [newInventory, setNewInventory] = useState(quantity)

    const renderSizeDetails = (size) => {
        return Object.entries(size).map(([key, value], index) => (
          <p key={index}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
        ));
      };

      function handleIncrease() {
        setNewInventory(prev => prev + 1)
      }

      function handleDecrease() {
        newInventory > 1 ? setNewInventory(prev => prev - 1) : setNewInventory(1);
    }

    const updatedInventory = {
        new_quantity: newInventory
    }


    function handleClick(e) {
        fetch(`/inventory/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInventory)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
    


    return (
        <div id="all-inventory">
            <h1>{product.name}</h1>
            {size && <div>{renderSizeDetails(size)}</div>}
            <h1>{quantity}</h1>
            <div className="quantity-control">
                    <button className="details-quantity-button" onClick={handleDecrease}>-</button>
                    <h2 className="quantity-display">{newInventory}</h2>
                    <button className="details-quantity-button" onClick={handleIncrease}>+</button>
                </div>
                <button onClick={handleClick}>Submit</button>
        </div>
    )


}

export default InventoryCard