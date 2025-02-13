// src/MysteryAlphabetGame.jsx
import React, { useState, useEffect, useCallback } from 'react';
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
  { name: 'Newt',           letter: 'N', image: '/images/newt.jpg' }, // Replacement for Narwhal
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
  const [flashLetter, setFlashLetter] = useState(null);

  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * alphabetItems.length);
    setCurrentItem(alphabetItems[randomIndex]);
    setMessage('');
    setWrongCount(0);
  };

  useEffect(() => {
    getRandomItem();
  }, []);

  // When the current item changes, trigger a flash on the correct key
  useEffect(() => {
    if (currentItem) {
      setFlashLetter(currentItem.letter.toUpperCase());
      const timer = setTimeout(() => {
        setFlashLetter(null);
      }, 1000); // Flash lasts for 1 second
      return () => clearTimeout(timer);
    }
  }, [currentItem]);

  // Wrap handleKeyPress in useCallback so it can be safely added as a dependency.
  const handleKeyPress = useCallback((event) => {
    const pressedKey = event.key.toUpperCase();
    if (currentItem && pressedKey === currentItem.letter.toUpperCase()) {
      setMessage('Correct!');
      setWrongCount(0);
      setTimeout(() => {
        getRandomItem();
      }, 1000);
    } else {
      if (wrongCount === 1) {
        setMessage(`The animal is ${currentItem.name}.`);
        setWrongCount(0);
        setTimeout(() => {
          getRandomItem();
        }, 1500);
      } else {
        setWrongCount(wrongCount + 1);
        setMessage('Try again!');
      }
    }
  }, [currentItem, wrongCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleVirtualKeyClick = (letter) => {
    handleKeyPress({ key: letter });
  };

  // Speech synthesis triggered by user interaction
  const speakAnimalName = (name) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="game-container">
      <div className="image-container">
        {currentItem && (
          <div className="image-wrapper">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="item-image"
              onLoad={() => speakAnimalName(currentItem.name)}
            />
            <button
              className="speak-icon"
              onClick={() => speakAnimalName(currentItem.name)}
            >
              &#128266;
            </button>
          </div>
        )}
      </div>
      <div className="feedback">{message}</div>
      <div className="keyboard">
        <div className="keyboard-row">
          {['Q','W','E','R','T','Y','U','I','O','P'].map(letter => (
            <button
              key={letter}
              className={`key-button${flashLetter === letter ? ' flash' : ''}`}
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
              className={`key-button${flashLetter === letter ? ' flash' : ''}`}
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
              className={`key-button${flashLetter === letter ? ' flash' : ''}`}
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
