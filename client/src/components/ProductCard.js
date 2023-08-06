import { Link } from "react-router-dom";

function ProductCard( { id, name, price, image_path, }) {

    return (
        <Link to={`/product/${id}`}>
            <div className="product-card">
                <img src={image_path} alt={name} className="product-img"/>
                <h1 className="product-name">{name}</h1>
                <h2 className="product-price">$ {price}</h2>
            </div>
        </Link>
    )
    } 
    
    export default ProductCard;
    