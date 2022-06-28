import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// //////////
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import useGetPosts from './fetchApi';
import Threads from './pages/Threads';
import TweetGallery from './pages/TweetGallery';
import Error from './pages/Error';
import Home from './pages/Home';
import BookmarkPage from './pages/BookmarkPage';
import SinglePost from './pages/SinglePost';
import CreateSnapshot from './pages/CreateSnapshot';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import {
  saveThreadToLocalStorage,
  updatePageHeight,
} from './features/tweet/tweetSlice';

function App() {
  const settingUpApp = useGetPosts();
  const dispatch = useDispatch();
  const { bookMarkList, pageHeight } = useSelector((state) => state.tweet);
  const { posts, isLoading, images } = settingUpApp;

  useEffect(() => {
    dispatch(saveThreadToLocalStorage());
  }, [bookMarkList]);

  window.addEventListener('scroll', () => {
    dispatch(updatePageHeight(window.scrollY));
  });

  if (posts === null) {
    return (
      <section className="spinner--container">
        <div className="spin"></div>
      </section>
    );
  }

  return (
    <Routes className="App">
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home posts={posts} images={images} />} />
        <Route path="threads" element={<Threads posts={posts} />} />
        <Route path="gallery" element={<TweetGallery images={images} />} />
        <Route path="bookmark" element={<BookmarkPage />} />
        <Route path="createSnapshot" element={<CreateSnapshot />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path=":postId" element={<SinglePost posts={posts} />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
