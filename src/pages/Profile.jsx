import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getSavedByKey } from '../services/localStorage';

export default function Profile() {
  const [showEmail, setShowEmail] = useState('');
  useEffect(() => {
    const { email } = getSavedByKey('user');
    setShowEmail(email);
  }, []);
  const logoutClear = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <h4 data-testid="profile-email">{ showEmail }</h4>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutClear }
        >
          Logout
        </button>
      </Link>
      <Footer title="Profile" />
    </div>
  );
}
