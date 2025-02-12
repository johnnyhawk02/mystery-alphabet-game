// src/MysteryAlphabetGame.jsx
import React, { useState, useEffect } from 'react';
import './MysteryAlphabetGame.css';

const alphabetItems = [
  { name: 'Alligator',      letter: 'A', image: '/images/alligator.jpg' },
  { name: 'Bear',           letter: 'B', image: '/images/bear.jpg' },
  { name: 'Cat',            letter: 'C', image: '/images/cat.jpg' },
  { name: 'Dog',            letter: 'D', image: '/images/dog.jpg' },
  { name: 'Elephant',       letter: 'E', image: '/images/elephant.jpg' },
  { name: 'Fox',            letter: 'F', image: '/images/fox.jpg' },
  { name: 'Giraffe',        letter: 'G', image: '/images/giraffe.jpg' },
  { name: 'Horse',          letter: 'H', image: '/images/horse.jpg' },
  { name: 'Iguana',         letter: 'I', image: '/images/iguana.jpg' },
  { name: 'Jaguar',         letter: 'J', image: '/images/jaguar.jpg' },
  { name: 'Koala',          letter: 'K', image: '/images/koala.jpg' },
  { name: 'Lion',           letter: 'L', image: '/images/lion.jpg' },
  { name: 'Monkey',         letter: 'M', image: '/images/monkey.jpg' },
  { name: 'Newt',           letter: 'N', image: '/images/newt.jpg' },  // Replacement for Narwhal
  { name: 'Owl',            letter: 'O', image: '/images/owl.jpg' },
  { name: 'Penguin',        letter: 'P', image: '/images/penguin.jpg' },
  { name: 'Quail',          letter: 'Q', image: '/images/quail.jpg' },
  { name: 'Rabbit',         letter: 'R', image: '/images/rabbit.jpg' },
  { name: 'Snake',          letter: 'S', image: '/images/snake.jpg' },
  { name: 'Tiger',          letter: 'T', image: '/images/tiger.jpg' },
  { name: 'Umbrella bird',  letter: 'U', image: '/images/umbrella_bird.jpg' },
  { name: 'Vulture',        letter: 'V', image: '/images/vulture.jpg' },
  { name: 'Wolf',           letter: 'W', image: '/images/wolf.jpg' },
  { name: 'X-ray fish',     letter: 'X', image: '/images/xray_fish.jpg' },
  { name: 'Yak',            letter: 'Y', image: '/images/yak.jpg' },
  { name: 'Zebra',          letter: 'Z', image: '/images/zebra.jpg' }
];

const MysteryAlphabetGame = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [message, setMessage] = useState('');
  const [wrongCount, setWrongCount] = useState(0);

  // Pick a random animal and reset the wrong count.
  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * alphabetItems.length);
    setCurrentItem(alphabetItems[randomIndex]);
    setMessage('');
    setWrongCount(0);
  };

  // Initialize with an animal on component mount.
  useEffect(() => {
    getRandomItem();
  }, []);

  // Handle key presses from both physical and virtual keyboards.
  const handleKeyPress = (event) => {
    const pressedKey = event.key.toUpperCase();
    if (currentItem && pressedKey === currentItem.letter.toUpperCase()) {
      setMessage('Correct!');
      setWrongCount(0);
      setTimeout(() => {
        getRandomItem();
      }, 1000);
    } else {
      if (wrongCount === 1) {
        // On second wrong attempt, reveal the animal and move on.
        setMessage(`The animal is ${currentItem.name}.`);
        setWrongCount(0);
        setTimeout(() => {
          getRandomItem();
        }, 1500);
      } else {
        // First wrong attempt.
        setWrongCount(wrongCount + 1);
        setMessage('Try again!');
      }
    }
  };

  // Add a global keydown listener.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentItem, wrongCount]);

  // Handler for virtual keyboard clicks.
  const handleVirtualKeyClick = (letter) => {
    handleKeyPress({ key: letter });
  };

  return (
    <div className="game-container">
      <div className="image-container">
        {currentItem && (
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="item-image"
          />
        )}
      </div>
      <p className="instructions">
        Press the key corresponding to the first letter of the animal’s name!
      </p>
      {/* Feedback area with reserved space */}
      <div className="feedback">{message}</div>
      <div className="keyboard">
        <div className="keyboard-row">
          {['Q','W','E','R','T','Y','U','I','O','P'].map(letter => (
            <button
              key={letter}
              className="key-button"
              onClick={() => handleVirtualKeyClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="keyboard-row">
          {['A','S','D','F','G','H','J','K','L'].map(letter => (
            <button
              key={letter}
              className="key-button"
              onClick={() => handleVirtualKeyClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="keyboard-row">
          {['Z','X','C','V','B','N','M'].map(letter => (
            <button
              key={letter}
              className="key-button"
              onClick={() => handleVirtualKeyClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MysteryAlphabetGame;
