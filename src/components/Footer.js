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
        <p>
          If you can't find a thread you're looking for or you want your tweet
          to get featured in our tweet gallery, please tag us on twitter to the
          post{' '}
          <a
            href="https://twitter.com/threads_rd"
            target="_blank"
            rel="noopener noreferrer"
          >
            @threads_rd
          </a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
