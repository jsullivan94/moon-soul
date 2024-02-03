import { Link } from "react-router-dom";
import { FaCartShopping } from 'react-icons/fa6';
import {FaInstagram, FaSpotify} from 'react-icons/fa'

function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src='/build/pictures/IMG_0449.PNG' alt='Moon Soul' />
                </Link>
                <div className='icon-container'>
                    <FaInstagram className="icon" onClick={() => window.open('https://www.instagram.com/moonsoulmusic/')} />
                    <FaSpotify className="icon" onClick={() => window.open('https://open.spotify.com/artist/7JJCj4PwTmJZdg53Z1Qznl')} />
                </div>
            <div className="nav-links">
                   
                <Link to="/">Home</Link>
                <Link to="/media">Media</Link>
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