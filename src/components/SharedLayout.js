import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function SharedLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <Outlet />
    </>
  );
}

export default SharedLayout;
