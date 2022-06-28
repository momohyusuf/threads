import React, { useState } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Threads from './Threads';
import TweetGallery from './TweetGallery';
import Footer from '../components/Footer';
function Home({ posts, images }) {
  return (
    <>
      <Header />
      <Sidebar />
      <Threads posts={posts} display />
      <TweetGallery images={images} display />
      <Footer />
    </>
  );
}

export default Home;
