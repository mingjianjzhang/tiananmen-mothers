import React, { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { GameContext } from './GameContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import './App.css';

const styles = {
  container: {
    'height': '100vh',
    'background-color': 'black',
    "display": "flex", /* Aligns children in a row by default */
    'justify-content': "center", /* Centers the container horizontally */
    'align-items': "center", /* Centers the container vertically */
  }
}


function App() {
  const [displayText, setDisplayText] = useState("");
  const [tightropeText, setTightropeText] = useState("");
  const [graveyardText, setGraveyardText] = useState("");
  const [rootsText, setRootsText] = useState("");

  return (
    <GameContext.Provider value={{ 
      displayText, 
      setDisplayText, 
      tightropeText,
      setTightropeText,
      graveyardText,
      setGraveyardText,
      rootsText,
      setRootsText,
    }}>
      <APIProvider apiKey={'AIzaSyAU8k-83eK_SE9V3Nun2FPMKoOmexri_wc'}>
        <div style={styles.container}>
            <LeftPanel />
            <RightPanel />
        </div>
      </APIProvider>
    </GameContext.Provider>

  );
}

export default App;
