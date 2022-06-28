import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function DisplayFilteredItems(props) {
  return (
    <section className="post--section">
      {' '}
      {!props.display && (
        <h4 style={{ textTransform: 'capitalize' }}>{props.headingText}</h4>
      )}
      <div className="threads--container">
        {props.items.map((thread) => {
          return (
            <article className="post" key={thread.sys.id}>
              <div className="post--header">
                <img src={thread.fields.userImage.fields.file.url} alt="" />
                <p className="author--name">{thread.fields.username}</p>
                <p className="date--posted">
                  {moment(thread.fields.postedOn).format('MMM Do YY')}
                </p>
              </div>
              <h3>
                <Link to={`/${thread.sys.id}`}>
                  {thread.fields.heading.slice(0, 50)}
                </Link>
              </h3>

              <div className="post--footer">
                <Link to={`/${thread.sys.id}`}>
                  <p>{thread.fields.tweets[0].text.slice(0, 50)}...</p>
                </Link>
                <button
                  onClick={() => props.toggleBookMark(thread.sys.id)}
                  className="bookmark--icon"
                >
                  {props.icon}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayFilteredItems;
