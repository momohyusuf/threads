import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineClose,
  AiFillHome,
  AiFillPicture,
  AiFillCamera,
} from 'react-icons/ai';
import { MdOutlineMessage, MdBookmarks } from 'react-icons/md';

import { closeSideBar } from '../features/tweet/tweetSlice';
import logo from '../images/logo--white.png';

function Sidebar() {
  const { isShown } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const style = {
    color: 'white',
    marginRight: '0.8em',
  };
  return (
    <aside
      className={`sidebar--section  overlay ${isShown && 'show--sidebar'}`}
    >
      <section
        className="sidebar--content"
        onClick={() => dispatch(closeSideBar())}
      >
        <section className="sidebar--header">
          <img src={logo} className="logo" alt="thread logo" />
          <button
            className="close--sidebar--toggle"
            onClick={() => dispatch(closeSideBar())}
          >
            <AiOutlineClose />
          </button>
        </section>

        <ul className="aside--links">
          <li>
            <AiFillHome style={style} />
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <MdOutlineMessage style={style} />
            <NavLink to="threads">Threads</NavLink>
          </li>
          <li>
            <AiFillPicture style={style} />
            <NavLink to="gallery">Tweet Gallery</NavLink>
          </li>
          <li>
            <MdBookmarks style={style} />
            <NavLink to="bookmark">Bookmarks</NavLink>
          </li>
          <li>
            <AiFillCamera style={style} />
            <NavLink to="createSnapshot">Tweet Snapshot</NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
