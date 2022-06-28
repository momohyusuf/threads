import React, { useEffect, useState, useRef } from 'react';
import { VscQuote, VscTwitter } from 'react-icons/vsc';
import html2canvas from 'html2canvas';
import changeColorIcon from '../images/change-color.png';
import downloadIcon from '../images/download--icon.png';
import verifiedIcon from '../images/twitter-verified.png';

function ScreenShot() {
  const [tweet, setTweet] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tweetId, setTweetId] = useState('1540750611590807553');
  const link = useRef();
  const colors = [
    '#90F1EF',
    '#FFFFFF',
    '#3B0D11',
    '#FF3C38',
    '#FFF275',
    '#2A4747',
    '#02182B',
    '#083D77',
    'black',
  ];
  const [value, setValue] = useState(0);
  const [currentColors, setCurrentColors] = useState('black');

  // get the tweet url then extract the id from it
  const getUrl = (e) => {
    e.preventDefault();
    const extractNumber = (trial) => {
      let pattern = /\d{5,}/g;
      let result = trial.match(pattern);
      return result;
    };

    let getId = extractNumber(link.current.value).toString();
    return setTweetId(getId);
  };

  ////////////
  // get the tweet details using an Api
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_APIKEY,
      'X-RapidAPI-Host': 'twitter154.p.rapidapi.com',
    },
  };

  async function getTweet(id) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://twitter154.p.rapidapi.com/tweet/details?tweet_id=${tweetId}`,
        options
      );

      const data = await response.json();
      setTweet(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTweet(tweetId);
  }, [tweetId]);
  // //////////

  // download the tweet using html2canvas
  function downloadImage(e) {
    const image =
      e.target.parentElement.parentElement.parentElement.children[0];
    html2canvas(image, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      const base64image = canvas.toDataURL('image/png');
      var anchor = document.createElement('a');
      anchor.setAttribute('href', base64image);
      anchor.setAttribute('download', 'twitter-image');
      anchor.click();
      anchor.remove();
    });
  }
  // ////////

  // change the color of the tweet to the user preference
  const changeColors = (e) => {
    const testing =
      e.target.parentElement.parentElement.parentElement.children[0];
    let randomColor = Math.floor(Math.random() * colors.length);

    if (randomColor === value) {
      randomColor = value + 1;
    }
    setValue(randomColor);
    setCurrentColors(colors[value]);
    console.log(currentColors);
    if (currentColors === 'black') {
      testing.style.color = 'white';
    } else if (currentColors === '#3B0D11') {
      testing.style.color = 'white';
    } else if (currentColors === '#088af4') {
      testing.style.color = 'white';
    } else if (currentColors === '#FF3C38') {
      testing.style.color = 'white';
    } else if (currentColors === '#2A4747') {
      testing.style.color = 'white';
    } else if (currentColors === '#02182B') {
      testing.style.color = 'white';
    } else if (currentColors === '#083D77') {
      testing.style.color = 'white';
    } else {
      testing.style.color = 'black';
    }
    return (testing.style.backgroundColor = currentColors);
  };

  // ///////////

  return (
    <section className="snapshot--section">
      <div className="snapshot--section--header">
        <input type="text" ref={link} placeholder="Paste your link here" />
        <button className="btn" onClick={getUrl}>
          generate tweet
        </button>
      </div>

      <section className="snapshot--section--content">
        {isLoading || tweet.message ? (
          <div className="spin"></div>
        ) : (
          <article className="snapshot--card--container">
            <div className="tweet--card">
              <VscQuote />
              <p className="tweeted--text">{tweet?.text}</p>
              <div className="tweeted--image">
                {' '}
                <img src={tweet?.media_url} alt="" />
              </div>
              <div className="tweet--card--footer">
                <div className="tweet--card--user--info">
                  <img
                    src={tweet?.user.profile_pic_url}
                    alt={tweet?.user.name}
                  />
                  <div>
                    <p>
                      {tweet?.user.name}
                      {tweet?.user.is_verified && (
                        <img
                          src={verifiedIcon}
                          className="verified--icon"
                          alt="verification icon"
                        />
                      )}
                    </p>
                    <small>@{tweet?.user.username}</small>
                  </div>
                </div>
                <VscTwitter
                  className="tweet--icon"
                  style={{ color: '#088af4' }}
                />
              </div>
              <small className="web--address">address</small> <br />
            </div>

            <div className="tweet--card--btns">
              <button onClick={changeColors}>
                <img src={changeColorIcon} alt="" />
              </button>
              <button onClick={downloadImage}>
                <img src={downloadIcon} alt="" />
              </button>
            </div>
          </article>
        )}
      </section>

      <div className="instruction">
        <h3>How it works</h3>
        <h4>Step 1:</h4>{' '}
        <span>Click on the share icon on the tweet you want to create</span>
        <h4>Step 2:</h4>{' '}
        <span>
          On the pop up menu click on the copy link icon to copy the link of the
          tweet
        </span>
        <h4>Step 3:</h4>{' '}
        <span>Paste the link on the input field as indicated</span>
        <h4>Step 4:</h4>{' '}
        <span>
          Click on the generate tweet button and wait for the tweet to load
        </span>
        <h4>Step 5:</h4>{' '}
        <span>
          Click on the paint icon to generate you favorite color then click on
          the download icon, to download to your gallery. And thats it you can
          share your tweet every where
        </span>
      </div>
    </section>
  );
}

export default ScreenShot;
