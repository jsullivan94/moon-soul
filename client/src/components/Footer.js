import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <Link className="privacy-link" to="/privacy-policy">Privacy Policy</Link>
        </div>
    );
}

export default Footer;
