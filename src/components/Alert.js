import React from 'react';
import { useSelector } from 'react-redux';

function Alert(props) {
  const { showAlert } = useSelector((state) => state.tweet);
  return (
    <section className={`alert--box ${showAlert.type} `}>
      {props.icon} <span>{showAlert.message}</span>
    </section>
  );
}

export default Alert;
