import React, { useState } from 'react';
import Tightrope from './Tightrope';
import Graveyard from './Graveyard';
import Roots from './Roots';

const styles = {
  base: {
    "display": "block",
    "width": "800px",
    "height": "800px"
  }
}


function LeftPanel() {
  return (
    <div style={styles.base}>
      <Tightrope />
      <Graveyard />
      <Roots />
    </div>
  );
}

export default LeftPanel;
