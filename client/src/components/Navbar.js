import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


    


function Navbar(){

    const navigate = useNavigate()

    return (
        <div className="navbar">
            {/* <FaBars /> */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/store">Store</Link>
            <Link to="/events">Events</Link>
            <button onClick={() => navigate("/cart")}>My Cart</button>
        </div>
    )
}

export default Navbar;