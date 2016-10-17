import React from 'react';
const {Row, Col} = require('react-flexgrid');

const DIFFICULTY_LABELS = {
  0: 'KidzOnly!',
  1: 'Tricky',
  2: 'Hard',
  3: 'INSANE!',
};

const Scoreboard = ({ current, high, difficulty }) => {
  return (
    <Row className="score-board">
      <Col xs={4}>Current Score: {current}</Col>
      <Col xs={4}>High Score: {high}</Col>
      <Col xs={4}>Difficulty: {DIFFICULTY_LABELS[difficulty]}</Col>
    </Row>
  );
};

export default Scoreboard;
