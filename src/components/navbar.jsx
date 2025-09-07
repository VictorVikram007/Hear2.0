import React, { useRef, useState, useEffect } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import './navbarres.css';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  // Pages that should always have black navbar
  const alwaysBlackPages = ['/products', '/hearingtest', '/profile', '/blogs', '/support'];

  // Detect scroll only for Home and About
  useEffect(() => {
    if (!alwaysBlackPages.includes(pathname)) {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => navigate('/profile');

  // Navbar class logic
  const navbarClass = `navbar ${
    alwaysBlackPages.includes(pathname) || scrolled ? 'scrolled solid' : ''
  }`;

  return (
    <nav className={navbarClass}>
      <div className="logo">H . E . A . R</div>

      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>

        {isMobile && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}

        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/hearingtest">Take a Hearing Test</Link></li>
      </ul>

      <div className="nav-icons">
        <div
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className={`search-container ${searchActive ? 'active' : ''}`}
          ref={searchRef}
          onClick={() => setSearchActive(true)}
        >
          <Search className="icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search hearing aids"
            autoFocus={searchActive}
          />
        </div>

        <ShoppingCart className="icon" />

        {!isMobile && (
          <div className="user-container">
            <User className="custicon" onClick={handleUserClick} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
