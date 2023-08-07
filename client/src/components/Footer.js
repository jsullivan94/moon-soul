
import {FaInstagram, FaSpotify} from 'react-icons/fa'
import NewsLetter from './NewsLetter';

function Footer() {
    return (
      
        <div className="footer">
            <h2>Follow Us!</h2>
            <div className='icon-container'>
            <FaInstagram className="icon" onClick={() => window.open('https://www.instagram.com/moonsoulmusic/')} />
            <FaSpotify className="icon" onClick={() => window.open('https://open.spotify.com/artist/7JJCj4PwTmJZdg53Z1Qznl')} />
            </div>
            <NewsLetter />
        </div>
     
    );
}

export default Footer;