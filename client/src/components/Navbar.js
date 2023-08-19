import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from 'react-icons/fa6';

    

function Navbar(){

    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="navbar-content">
            <img onClick={() => navigate("/")}src='/pictures/IMG_6816.png' alt='Moon Soul'/>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/photos">Photos</Link>
                <Link to="/store">Store</Link>
                <FaCartShopping className="shop-icon" onClick={() => navigate("/cart")} />
            </div>
            </div>
        </div>
    );
}

export default Navbar;