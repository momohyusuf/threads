import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useGetPosts from '../fetchApi';
import { filterThreads, currentHeading } from '../features/tweet/tweetSlice';

function Inputs() {
  const tweets = useGetPosts();
  const dispatch = useDispatch();
  const { posts, isLoading } = tweets;

  // getting the categories
  const category = posts?.items.map((item) => item.fields.category);
  // ////
  // getting only the unique values from the categories
  const categoryList = [...new Set(category)];
  // /////////////
  function filterThreadByCategory(e) {
    const exactMatch = e.target.value;

    const filteringPosts = posts?.items.filter((item) => {
      let result;
      if (exactMatch.toLowerCase() === 'all') {
        result = item;
      } else {
        result =
          item.fields.category.toLowerCase() === exactMatch.toLowerCase();
      }
      return result;
    });
    dispatch(currentHeading(exactMatch));
    dispatch(filterThreads(filteringPosts));
  }

  //   ///////////////
  // filter Thread by title
  function filterThreadByTitle(e) {
    const exactMatch = e.target.value;
    const filteringPosts = posts?.items.filter((item) =>
      item.fields.heading.toLowerCase().includes(exactMatch.toLowerCase())
    );
    dispatch(currentHeading('All'));
    dispatch(filterThreads(filteringPosts));
  }
  // /////////////
  return (
    <>
      <select onChange={filterThreadByCategory}>
        <option value="all">--Select a category--</option>
        {categoryList.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        onChange={filterThreadByTitle}
        type="text"
        placeholder="Search for thread e.g Elon Musk"
      />
    </>
  );
}

export default Inputs;
