import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/meals">
        <button type="button">
          <img data-testid="meals-bottom-btn" src={ mealIcon } alt="profile" />
        </button>
      </Link>
      <Link to="/drinks">
        <button type="button">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="profile" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
