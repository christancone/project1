import React, { useState } from 'react';
import './Test.css'; // Import your CSS file if you're using one

const ColorButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      className={`btn ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      Click Me
    </button>
  );
};

export default ColorButton;