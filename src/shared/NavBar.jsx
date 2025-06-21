import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // We'll create this next

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}
      >
        Home
      </NavLink>
      <NavLink
        to="/quiz"
        className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}
      >
        Quiz
      </NavLink>
    </nav>
  );
}
