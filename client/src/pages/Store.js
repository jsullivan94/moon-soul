import ProductCard from "../components/ProductCard";

function Store ( { products }) {

    const items = products.map(product => {
        return(
            
        <ProductCard  key={product.id} {...product} />
            
        )
    });

    return (
        
        <div className="products-container">
            {items}
        </div>
    )
}

export default Store;