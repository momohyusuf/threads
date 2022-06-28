import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineTwitter } from 'react-icons/ai';
import moment from 'moment';

function SinglePost({ posts }) {
  const [readingTime, setReadingTime] = useState('');
  const { postId } = useParams();
  // ////////
  const findSingleThread = posts?.items.find((item) => item.sys.id === postId);
  // ///////////
  const lengthOfText = findSingleThread.fields.tweets.map(
    (item) => item.text.length
  );
  // /////////////
  const totalLengthOfText = lengthOfText.reduce((a, b) => {
    return a + b;
  });
  // ///////////

  const calculateReadingTime = (value) => {
    const wordPerMinute = 225;
    const wordPerSecond = wordPerMinute / 60;
    const wordCount = value;
    const seconds = Math.floor(wordCount / wordPerSecond);
    let result;
    if (seconds > 60) {
      result = `${Math.floor(seconds / 60)} Mins`;
    } else {
      result = `${Math.floor(seconds)} secs`;
    }
    return setReadingTime(result);
  };
  useEffect(() => {
    calculateReadingTime(totalLengthOfText);
  }, []);

  return (
    <>
      <section className="single--thread--section">
        <article className="single--thread--content--container">
          {
            <section className="single--thread--content--header">
              <div className="author--image">
                <img
                  src={findSingleThread.fields.userImage.fields.file.url}
                  alt={findSingleThread.fields.username}
                />
              </div>
              <div>
                {' '}
                <a
                  href={findSingleThread.fields.userlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author--name"
                >
                  {findSingleThread.fields.username}
                </a>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="content--date">
                    {moment(findSingleThread.fields.postedOn).format('MMM Do')}{' '}
                    {'.'}
                  </span>
                  <span className="content--readingtime">
                    {readingTime} read
                  </span>
                  <a
                    href={findSingleThread.fields.userlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tweet--icon"
                  >
                    <AiOutlineTwitter />
                  </a>
                </div>
              </div>
            </section>
          }
          {
            <section className="single--thread--main--content">
              <h3>{findSingleThread.fields.heading}</h3>
              {findSingleThread.fields.tweets.map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item.text}</p>

                    <img src={item.media_url} alt="" />
                  </div>
                );
              })}
            </section>
          }
          <p>
            Enjoyed what you just read? consider following the thread owner on
            twitter{' '}
            <a
              href={findSingleThread.fields.userlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {findSingleThread.fields.username} <AiOutlineTwitter />
            </a>{' '}
          </p>
        </article>
      </section>
    </>
  );
}

export default SinglePost;
