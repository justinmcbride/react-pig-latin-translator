import './GameContainer.css';

import { useState } from 'react';

import _ from "lodash";

const GameMode = ({timeRemaining, isGameRunning, gameScore}) => {

  return (
    <div className="gameModeContainer">
      <span>Score: {gameScore}</span><br/>
      <span>Time: {timeRemaining}</span>
    </div>
  )
};

export default GameMode;
