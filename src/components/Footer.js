import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo--white.png';

function Footer() {
  return (
    <footer>
      <section className="footer--content">
        <img src={logo} alt="" />
        <ul>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <li>
            <Link to="privacy">Privacy</Link>
          </li>
        </ul>
        <p>
          <span>&copy;</span> <span>{new Date().getFullYear()}</span> Starkweb
          Technologies
        </p>
      </section>
    </footer>
  );
}

export default Footer;
