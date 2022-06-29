import React, { useState } from 'react';
import { VscQuote, VscTwitter } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import changeColorIcon from '../images/change-color.png';
import downloadIcon from '../images/download--icon.png';
import verifiedIcon from '../images/twitter-verified.png';

function TweetGallery({ images, display }) {
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
  const galleryTweets = images?.items[0]?.fields?.tweetGallery;
  const [value, setValue] = useState(0);
  const [currentColors, setCurrentColors] = useState('#ffffff');

  // download the current tweet to user gallery
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

  function showCertainNumberOfItems() {
    let result;
    if (display) {
      result = galleryTweets.slice(0, 8);
    } else {
      result = galleryTweets;
    }
    return result;
  }

  return (
    <main style={{ padding: `${display ? '3em 1em' : '8em 1em'}` }}>
      <section className="gallery--section">
        {showCertainNumberOfItems().map((item, index) => {
          return (
            <article className="tweet--card--container" key={index}>
              <div className="tweet--card">
                <VscQuote />
                <p className="tweeted--text">{item.text}</p>
                <div className="tweeted--image">
                  {' '}
                  <img src={item.media_url} alt="" />
                </div>
                <div className="tweet--card--footer">
                  <div className="tweet--card--user--info">
                    <img src={item.profile_pic_url} alt={item.name} />
                    <div>
                      <p>
                        {item.name}

                        {item.is_verified && (
                          <img
                            src={verifiedIcon}
                            className="verified--icon"
                            alt="verification badge"
                          />
                        )}
                      </p>
                      <small>@{item.username}</small>
                    </div>
                  </div>
                  <VscTwitter
                    className="tweet--icon"
                    style={{ color: '#088af4' }}
                  />
                </div>
                <small className="web--address">
                  https://threadss.netlify.app
                </small>
                <br />
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
          );
        })}
      </section>
      {display && (
        <button className="btn">
          <Link to="gallery">View Tweet Gallery</Link>
        </button>
      )}
    </main>
  );
}

export default TweetGallery;
