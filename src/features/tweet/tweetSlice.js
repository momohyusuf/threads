import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredPost: [],
  isShown: false,
  categoryHeading: '',
  showAlert: {
    show: false,
    message: '',
    type: '',
  },
  bookMarkList: JSON.parse(localStorage.getItem('bookmarkList')) || [],
  pageHeight: 0,
};

const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    filterThreads: (state, { payload }) => {
      state.filteredPost = payload;
    },
    currentHeading: (state, { payload }) => {
      state.categoryHeading = payload;
    },
    openSideBar: (state) => {
      state.isShown = true;
    },
    closeSideBar: (state) => {
      state.isShown = false;
    },
    toggleAlert: (state, { payload }) => {
      state.showAlert = payload;
    },
    addedToBookmark: (state, { payload }) => {
      state.bookMarkList = [...state.bookMarkList, payload];
    },
    removeFromBookmark: (state, { payload }) => {
      state.bookMarkList = payload;
    },
    saveThreadToLocalStorage: (state) => {
      localStorage.setItem('bookmarkList', JSON.stringify(state.bookMarkList));
    },
    updatePageHeight: (state, { payload }) => {
      state.pageHeight = payload;
    },
  },
});
export const {
  filterThreads,
  openSideBar,
  closeSideBar,
  currentHeading,
  toggleAlert,
  addedToBookmark,
  saveThreadToLocalStorage,
  removeFromBookmark,
  updatePageHeight,
} = tweetSlice.actions;
export default tweetSlice.reducer;
