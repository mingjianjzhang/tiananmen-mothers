import React from 'react';

export const GameContext = React.createContext({
  displayText: "", // Existing variable
  setDisplayText: () => {}, // Existing setter
  tightropeText: null, // New variable for tightrope section
  setTightropeText: () => {}, // Setter for tightrope section
  graveyardText: null, // New variable for graveyard section
  setGraveyardText: () => {}, // Setter for graveyard section
  rootsText: null, // New variable for roots section
  setRootsText: () => {}, // Setter for roots section

});
