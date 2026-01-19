import React, { useState } from 'react';
import '../styles/Header.css';
const Header = ({ onSearch, showToast, products, onLoginClick, onRegisterClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };
  const handleSuggestionClick = (product) => {
    setSearchQuery(product.title);
    onSearch(product.title);
    setShowSuggestions(false);
  };
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick(); 
    } else {
      showToast('Login Required', 'Login functionality coming soon!');
    }
  };
  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick(); 
    } else {
      showToast('Register', 'Registration functionality coming soon!');
    }
  };
  const filteredSuggestions = products
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 6);
  return (
    <header className="header-fixed">
      {}
      <div className="guest-banner">
        🎉 Guest Mode - 
        <button 
          onClick={handleLoginClick}
          className="banner-login-btn"
        >
          Login for Cart & Exclusive Discounts!
        </button>
      </div>
      {}
      <div className="header-main-container">
        <div className="header-content">
          {}
          <div className="logo-section">
            <div className="logo-icon">🏠</div>
            <div className="logo-text">
              <h1 className="text-lg font-bold m-0">RentEasy Nepal</h1>
              <p className="text-xs text-muted m-0">Furniture & Appliances</p>
            </div>
          </div>
          {}
          <div className="search-wrapper">
            <span className="search-icon-span">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search furniture & appliances in Nepal..."
              className="search-input"
              autoComplete="off"
            />
            {}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {filteredSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="suggestion-item"
                  >
                    <span>{product.title}</span>
                    <span className="text-muted">Rs. {product.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {}
          <div className="auth-buttons-group">
            <button 
              onClick={handleLoginClick}
              className="btn-outline-custom"
            >
              Login
            </button>
            <button 
              onClick={handleRegisterClick}
              className="btn-primary-custom"
            >
              Register
            </button>
            <a href="#deals" className="deals-badge">
              Deals 
              <span className="deals-tag">20%</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
