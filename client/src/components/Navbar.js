import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from 'react-icons/fa6';

    

function Navbar(){

    const navigate = useNavigate();

    return (
        <div className="navbar">
            <img onClick={() => navigate("/")}src='/pictures/RNI-Films-IMG-4CCAFE9E-3F30-4DFD-8C71-3D55E9D8410B.jpeg' alt='Moon Soul'/>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/store">Store</Link>
                <Link to="/photos">Photos</Link>
                {/* <button onClick={() => navigate("/cart")}>My Cart</button> */}
                <FaCartShopping className="shop-icon" onClick={() => navigate("/cart")} />
            </div>
        </div>
    );
}

export default Navbar;