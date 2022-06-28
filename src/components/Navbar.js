import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineBars } from 'react-icons/ai';
import { openSideBar } from '../features/tweet/tweetSlice';
import logo from '../images/logo--white.png';
import logoBlue from '../images/logo--blue.png';

function Navbar() {
  const dispatch = useDispatch();
  const { pageHeight } = useSelector((state) => state.tweet);
  const value = 426.5;
  const style = {
    color: `${pageHeight > value ? '#088af4' : '#fcfcfc'}`,
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: `${pageHeight > value ? '#fcfcfc' : '#088af4'}`,
        borderBottom: `1px solid ${pageHeight > value ? '#088af4' : '#fcfcfc'}`,
      }}
    >
      <section className="navbar--content">
        <div>
          <img
            className="logo"
            src={pageHeight > value ? logoBlue : logo}
            alt="thread logo"
          />
        </div>

        <button
          onClick={() => dispatch(openSideBar())}
          className="toggle--sidebar"
        >
          <AiOutlineBars
            style={{ color: ` ${pageHeight > value ? '#088af4' : '#fcfcfc'}` }}
          />
        </button>
        <ul className="nav--links">
          <li>
            <NavLink to="/" style={style}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={style} to="threads">
              Threads
            </NavLink>
          </li>
          <li>
            <NavLink style={style} to="gallery">
              Tweet Gallery
            </NavLink>
          </li>
          <li>
            <NavLink style={style} to="bookmark">
              Bookmarks
            </NavLink>
          </li>

          <li>
            <NavLink style={style} to="createSnapshot">
              Tweet Snapshot
            </NavLink>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
