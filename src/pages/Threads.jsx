import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkHeartFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import Inputs from '../components/inputs';
import Alert from '../components/Alert';
import DisplayFilteredItems from '../components/displayFilteredItems';

import {
  addedToBookmark,
  toggleAlert,
  filterThreads,
  currentHeading,
} from '../features/tweet/tweetSlice';
import { Link } from 'react-router-dom';

function Threads({ posts, display }) {
  const [value, setValue] = useState(0);
  const { categoryHeading, filteredPost, showAlert, bookMarkList } =
    useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const addItemToBookMark = (iD) => {
    const specificThread = posts?.items.find((item) => {
      return item.sys.id === iD;
    });
    const checkIfItemAlreadyExistInBookmark = bookMarkList.find((item) => {
      return item.sys.id === iD;
    });
    if (checkIfItemAlreadyExistInBookmark) {
      setValue((preValue) => preValue + 1);
      dispatch(
        toggleAlert({
          show: true,
          message: 'Already bookmarked',
          type: 'danger',
        })
      );
      return;
    } else {
      dispatch(addedToBookmark(specificThread));
      dispatch(
        toggleAlert({
          show: true,
          message: 'Thread added to bookmark',
          type: 'success',
        })
      );
    }
  };
  // useEffect for showing alert box
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(
        toggleAlert({
          show: false,
          message: '',
        })
      );
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [bookMarkList, value]);
  // //////
  // this is for setting top threads on the home screen

  useEffect(() => {
    function filterThreadByCategory() {
      const exactMatch = 'Top';
      const filteringPosts = posts?.items.filter((item) => {
        return item.fields.category.toLowerCase() === exactMatch.toLowerCase();
      });
      dispatch(filterThreads(filteringPosts));
      dispatch(currentHeading('Top'));
    }
    filterThreadByCategory();
  }, []);
  //
  const threads = () => {
    if (filteredPost.length === 0) {
      return posts?.items;
    } else {
      return filteredPost;
    }
  };

  function showCertainNumberOfItems() {
    let result;
    if (display) {
      result = threads().slice(0, 8);
    } else {
      result = threads();
    }
    return result;
  }

  const style = {
    fontWeight: '700',
    letterSpacing: '0.3rem',
    margin: '1em 0',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      <main style={{ padding: `${display ? '2em 1em' : '8em 1em'}` }}>
        {showAlert.show && (
          <Alert icon={<BsFillBookmarkCheckFill className="success--icon" />} />
        )}

        {display && (
          <div style={style}>
            <h3>
              <AiOutlineStock style={{ marginRight: '0.5em' }} />
              Top Threads.
            </h3>
          </div>
        )}
        {!display && <Inputs />}
        <DisplayFilteredItems
          items={showCertainNumberOfItems()}
          headingText={categoryHeading}
          toggleBookMark={addItemToBookMark}
          icon={<BsBookmarkHeartFill />}
          display={display}
        />

        {display && (
          <button className="btn">
            <Link to="threads">View All Threads</Link>
          </button>
        )}
      </main>
    </>
  );
}

export default Threads;
