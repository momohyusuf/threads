import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillBookmarkXFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import DisplayFilteredItems from '../components/displayFilteredItems';
import Alert from '../components/Alert';
import { removeFromBookmark, toggleAlert } from '../features/tweet/tweetSlice';

function BookmarkPage() {
  const { bookMarkList, showAlert } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const removeItemFromBookMarkList = (iD) => {
    const newList = bookMarkList.filter((item) => item.sys.id !== iD);
    dispatch(
      toggleAlert({
        show: true,
        message: 'removed from bookmark',
        type: 'danger',
      })
    );
    dispatch(removeFromBookmark(newList));
  };
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
  }, [bookMarkList]);
  return (
    <>
      {showAlert.show && (
        <Alert icon={<BsFillBookmarkDashFill className="danger--icon" />} />
      )}
      <main>
        {bookMarkList.length <= 0 ? (
          <h3>Your Bookmark is Empty</h3>
        ) : (
          <DisplayFilteredItems
            items={bookMarkList}
            headingText="Bookmark List"
            toggleBookMark={removeItemFromBookMarkList}
            icon={<BsFillBookmarkXFill />}
          />
        )}
      </main>
    </>
  );
}

export default BookmarkPage;
