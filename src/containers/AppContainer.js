import React, { Component } from 'react';
import _ from 'lodash';

import App from '../components/App';

const DIFFICULTY_MAP = {
  0: 1000,
  1: 750,
  2: 500,
  3: 300,
};

const SCORE_DIFFICULTY_MAP = [
  [10, 1],
  [20, 2],
  [30, 3],
];

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      gameStarted: false,
      activeTargets: [],
      score: {
        current: 0,
        high: 0,
      },
      difficulty: 0,
      gameOver: false,
    };
    this.gameMaster = this.gameMaster.bind(this);
    this.toggleGameplay = this.toggleGameplay.bind(this);
    this.onWhack = this.onWhack.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  toggleGameplay() {
    let { gameStarted } = this.state;
    if (gameStarted) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.gameMaster, 1000);
    }
    gameStarted = !gameStarted;
    this.setState({
      ...this.state,
      gameStarted
    });
  }
  updateTimer(interval) {
    clearInterval(this.timer);
    this.timer = setInterval(this.gameMaster, interval);
  }
  gameMaster() {
    const { board, activeTargets } = this.state;

    if (_.flatten(board).length === activeTargets.length) {
      this.toggleGameplay();
      alert('Game over!');
      return this.setState({
        ...this.state,
        gameOver: true,
      });
    }

    const nextTarget = _(board)
      .flatten()
      .difference(activeTargets)
      .shuffle()
      .head();

    activeTargets.push(nextTarget);

    this.setState({
      ...this.state,
      activeTargets
    });
  }
  onWhack(id) {
    const { activeTargets, score, difficulty, gameStarted } = this.state;

    if (!gameStarted) {
      return;
    }

    if (_.includes(activeTargets, id)) {

      // Update Scores
      score.current++;
      if (score.current >= score.high) {
        score.high = score.current;
      }

      // Update difficulty
      let newDifficulty =
        _.last(
          _(SCORE_DIFFICULTY_MAP)
          .filter(mapping => {
            return _.head(mapping) <= score.current;
          })
          .last()
        ) || 0;

      if (newDifficulty !== difficulty) {
        this.updateTimer(DIFFICULTY_MAP[newDifficulty]);
      }

      this.setState({
        ...this.state,
        activeTargets: _.pull(activeTargets, id),
        score,
        difficulty: newDifficulty,
      });
    }
  }
  resetGame() {
    const { score } = this.state;
    score.current = 0;
    this.setState({
      ...this.state,
      activeTargets: [],
      score,
      difficulty: 0,
      gameOver: false
    }, () => {
      this.toggleGameplay();
    });
  }
  render() {
    return (
      <App
        toggleGameplay={this.toggleGameplay}
        resetGame={this.resetGame}
        onWhack={this.onWhack}
        {...this.state}/>
    );
  }
}

export default AppContainer;
