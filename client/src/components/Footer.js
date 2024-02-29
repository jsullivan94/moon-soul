import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <Link className="privacy-link" to="/privacy-policy">Privacy Policy</Link>
            <a className="email" href="mailto:moonsoulmusician@gmail.com">moonsoulmusician@gmail.com</a>
        </div>
    );
}

export default Footer;
