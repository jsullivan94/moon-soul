import { Link } from "react-router-dom";
import { FaCartShopping } from 'react-icons/fa6';

function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src='/pictures/IMG_6816.png' alt='Moon Soul' />
                </Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/photos">Photos</Link>
                <Link to="/store">Store</Link>
                <Link to="/cart">
                    <FaCartShopping className="shop-icon" />
                </Link>
            </div>
            </div>
        </div>
    );
}

export default Navbar;