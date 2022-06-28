import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import hero from '../images/hero--background.jpg';

function Header() {
  const { isShown } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();
  return (
    <header className={`${isShown && 'hide--header'}`}>
      <section className="intro--section">
        <div>
          <h1>Threads.</h1>
          <p>
            Find Your Favorite Twitter Threads and Tweets all in one place.{' '}
          </p>
        </div>
        <img src={hero} alt="" />
      </section>
    </header>
  );
}

export default Header;
