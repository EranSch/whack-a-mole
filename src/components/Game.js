import React  from 'react';
const {Row, Col} = require('react-flexgrid');
import { includes } from 'lodash';

import Target from './Target';
import Scoreboard from './Scoreboard';

const Game = ({
  board,
  activeTargets,
  toggleGameplay,
  gameStarted,
  onWhack,
  score,
  difficulty,
  gameOver,
  resetGame,
}) => (
  <div className="game">
    <h1 className="header">
      Whack-a-Mole! ({gameStarted ? 'GO!' : 'Paused'})
    </h1>
    { gameOver ?
      (<button onClick={resetGame}>Reset</button>) :
      (<button onClick={toggleGameplay}>Play/Pause</button>)
    }
    <Scoreboard {...score} difficulty={difficulty}/>
    <div className="game-board">
      {board.map((row, rowId) => (
        <Row key={rowId}>
          {row.map(i => (
            <Col xs={4} key={i}>
              <Target isActive={includes(activeTargets, i)} onWhack={onWhack} id={i} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  </div>
);

export default Game;
