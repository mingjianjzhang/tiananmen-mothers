import React, { useContext, useState, useEffect } from 'react';
import splatterOne from '../img/splatter1.png';
import splatterTwo from '../img/splatter2.png';
import splatterThree from '../img/splatter3.png';
import emblem from '../img/Danghui.png';
import { GameContext } from '../GameContext';
import tightrope from '../img/tightrope.png';
import {appData} from '../data/tightrope'

const tightropeData = appData.tightropeData

const CONSTANTS = {
  BASE: "BASE",
  SPLATTERS: [
    ["SPLATTER_ONE", splatterOne],
    ["SPLATTER_TWO", splatterTwo],
    ["SPLATTER_THREE", splatterThree],
    ["SPLATTER_FOUR", splatterOne],
    ["SPLATTER_FIVE", splatterTwo],
    ["SPLATTER_SIX", emblem]
  ]
}

const styles = {}
styles[CONSTANTS.BASE] = {
  "background-image": `url(${tightrope})`,
  "width": "800px",
  "height": "150px",
  "position": "relative",
  "display": "block"
};
styles[CONSTANTS.SPLATTERS[0][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "308px",
  "top": "80px",
  "width": "50px",
  "height": "50px",
  // "background-image": `url(${splatterOne})`
}
styles[CONSTANTS.SPLATTERS[1][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "280px",
  "top": "80px",
  "width": "50px",
  "height": "50px",
  // "background-image": `url(${splatterTwo})`
}
styles[CONSTANTS.SPLATTERS[2][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "260px",
  "top": "80px",
  "width": "50px",
  "height": "50px",
  // "background-image": `url(${splatterThree})`
}
styles[CONSTANTS.SPLATTERS[3][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "260px",
  "top": "80px",
  "width": "50px",
  "height": "50px",
  // "background-image": `url(${splatterOne})`
}
styles[CONSTANTS.SPLATTERS[4][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "250px",
  "top": "80px",
  "width": "50px",
  "height": "50px",
}
styles[CONSTANTS.SPLATTERS[5][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "128px",
  "top": "205px",
  "width": "40px",
  "height": "40px",
}

styles["CENTER"] = {
  textAlign: "center",
  fontFamily: "Dancing Script, cursive"
}

styles["RIGHT"] = {
  textAlign: "right",
  fontFamily: "Courier Prime, monospace",
  display: "block"
}

styles["TEXT_BOX"] = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black background with 80% opacity
  color: 'white', // White text color
  padding: '20px', // Add some padding inside the container
  borderRadius: '8px', // Adds rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adds a subtle shadow
  maxWidth: '90%', // Ensure the container doesn't exceed the width of its parent
  margin: '10px auto', // Center the container horizontally
  fontSize: "14px",
  fontFamily: "Raleway, sans-serif"
};



function Tightrope() {
  const { setTightropeText } = useContext(GameContext);
  const [splatteredIndex, setSplatteredIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);

  useEffect(() => {
    if (previousIndex !== null) {
      const timer = setTimeout(() => {
        setPreviousIndex(null);
      }, 500); // Time matches fade-out animation duration
      return () => clearTimeout(timer);
    }
  }, [previousIndex]);

  const renderContent = (contentArray) => {
    return contentArray.map(paragraph => (
      <p>{paragraph}</p>
    ))
  }

  const handleFigureClick = (index) => {
    if (splatteredIndex !== index) {
      setPreviousIndex(splatteredIndex); // Set previous index for fade-out
      setSplatteredIndex(index); // Set new splattered index
      setTightropeText((
        <div style={styles["TEXT_BOX"]} className="fade-in">  
          <h2 style={styles["CENTER"]}> Watching the Grass Curl</h2>
          {renderContent(tightropeData[index].content)}
          <a style={styles["RIGHT"]} href={tightropeData[index].citationLink} target="_blank">{tightropeData[index].author}</a>
        </div>
      ))
    }
  };


  const handleClick = () => {
    console.log("I was clicked????");
  }

  function renderPlaceholderSplatters() {
    return CONSTANTS.SPLATTERS.map((splatterStyle, index) => (
        <div
          key={index}
          style={styles[splatterStyle[0]]}
          onClick={() => handleFigureClick(index)}
          >
            {splatteredIndex === index && (
              <img src={splatterStyle[1]} alt="Blood Splatter" className="blood-splatter fade-in" />
            )}
            {previousIndex === index && (
              <img src={splatterStyle[1]} alt="Blood Splatter" className="blood-splatter fade-out" />
            )}
        </div>
    ))
  }

  return (
    <div style={styles[CONSTANTS.BASE]} onClick={handleClick}>
      {renderPlaceholderSplatters()}
    </div>  
  );
}

export default Tightrope;
