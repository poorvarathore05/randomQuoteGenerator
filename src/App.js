
import { useState, useEffect } from 'react';
import './App.css';
import { Card, Button } from 'react-bootstrap';

import axios from "axios";
import { FaTwitter } from 'react-icons/fa';
import { ImTumblr } from 'react-icons/im';
import "./QuoteGenerator.css";

function App() {

  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  let color;
  const [quotes, setQuotes] = useState("");
  const [quoteLoaded, setQuoteLoaded] = useState(false);

  async function getNewQuote() {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      console.log(response.data);
      setQuotes(response.data);
    }
    catch (error) {
      console.error(error);
    }
    getRandomColor();
    setQuoteLoaded(true);
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    color = `rgb(${r},${g},${b})`;
    setBgColor(color);
    setTextColor(color);
    return color;
  }

  useEffect(() => {
    getNewQuote();
    getRandomColor();
  }, []);

  if (!quoteLoaded) return "Loading......";

  return (
    <div className="App" style={{ backgroundColor: bgColor }} >
      <div className='App-header' >
        <Card id="quote-box">
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p id="text" style={{ color: textColor }}>
                {' '}
                {quotes.content}.{' '}
              </p>
              <footer className="blockquote-footer " id="author">
                {quotes.author}
              </footer>
            </blockquote>
            <div className='buttons'  >
              <Button style={{ backgroundColor: bgColor }}
                id="tweet-quote" href="https://twitter.com/intent/tweet">
                <FaTwitter />
              </Button>
              <Button style={{ backgroundColor: bgColor }}
                id="tumblr-quote" href="https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DAristotle%26content%3DThere%2Bis%2Bonly%2Bone%2Bway%2Bto%2Bavoid%2Bcriticism%253A%2Bdo%2Bnothing%252C%2Bsay%2Bnothing%252C%2Band%2Bbe%2Bnothing.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button">
                <ImTumblr />
              </Button>
              <Button style={{ backgroundColor: bgColor }}
                id="new-quote" onClick={getNewQuote}>New Quote
              </Button>
            </div>

          </Card.Body>

        </Card>
      </div>
    </div >
  );
}

export default App;
