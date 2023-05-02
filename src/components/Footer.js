import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
    return (
        <div className="footer-grid-container">
            <div className="grid-1">By Team: Import Awesome!</div>
            <div className="grid-2">
                <Link to={'http://localhost:3001/copyright'}>
                    Copyright Info
                </Link>
            </div>
            <div className="grid-3">
                <Link
                    to={'https://youtu.be/dQw4w9WgXcQ'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Terms and Conditions
                </Link>
            </div>
        </div>
    );
};

export default Footer;
