import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import topFirst from '../img/topFirst.png';
import topSecond from '../img/topSecond.png';
import topThird from '../img/topThird.png';

const styles = {
  commentary: {
    "height": "800px",
    "margin-left": "30px",
    "width": "500px",
    "color": "white",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "font-size": "10px",
  },
  tightrope: {
    "height": "266px",
    "width": "500px",
    "overflow": "scroll",
    "background-image": `url(${topFirst})`,
    "box-sizing": "border-box",
    "padding": "10px"
  },
  graveyard: {
    "height": "266px",
    "width": "500px",
    "overflow": "scroll",
    "background-image": `url(${topSecond})`,
    "box-sizing": "border-box"
  },
  roots: {
    "height": "266px",
    "width": "500px",
    "overflow": "scroll",
    "background-image": `url(${topThird})`,
    "box-sizing": "border-box"

  }
}

// styles[CONSTANTS.BASE] = {
//   "background-image": `url(${graveyard})`,
//   "width": "800px",
//   "height": "168px"
// };

function RightPanel() {
  const { displayText, graveyardText, tightropeText, rootsText } = useContext(GameContext);

  return (
    <div style={styles.commentary}>
      <div style={styles.tightrope}>
        {tightropeText}
      </div>
      <div style={styles.graveyard}>
        {graveyardText}
      </div>
      <div style={styles.roots}>
        {rootsText}
      </div>
    </div>
  );
}

export default RightPanel;
