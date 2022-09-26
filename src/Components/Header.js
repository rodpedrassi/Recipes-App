import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [barSearch, setBarSearch] = useState(false);

  const SearchShow = title === 'Meals' || title === 'Drinks';

  const searchShowBar = () => setBarSearch((prevState) => !prevState);

  return (
    <div>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      {SearchShow && (
        <i data-testid="search-top-btn" src={ searchIcon }>
          <button type="button" onClick={ searchShowBar }>
            <img
              src={ searchIcon }
              alt="Ícone de pesquisa"
            />
          </button>
        </i>
      )}
      {barSearch && (
        <div>
          <input type="text" data-testid="search-input" />
        </div>
      )}
      <h2 data-testid="page-title">{title}</h2>

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;