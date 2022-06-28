import { configureStore } from '@reduxjs/toolkit';
import tweetReducer from './features/tweet/tweetSlice';

export default configureStore({
  reducer: {
    tweet: tweetReducer,
  },
});
