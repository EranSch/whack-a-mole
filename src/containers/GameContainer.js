import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Game from '../components/Game';
import { saveCurrentScore } from '../redux/modules/Game/actionCreators';

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

class GameContainer extends Component {
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
    const { activeTargets, difficulty, gameStarted } = this.state;

    if (!gameStarted) {
      return;
    }

    if (_.includes(activeTargets, id)) {

      // Update Scores
      const newScore = this.props.currentScore + 1;

      // Update difficulty
      let newDifficulty =
        _.last(
          _(SCORE_DIFFICULTY_MAP)
          .filter(mapping => {
            return _.head(mapping) <= newScore;
          })
          .last()
        ) || 0;

      if (newDifficulty !== difficulty) {
        this.updateTimer(DIFFICULTY_MAP[newDifficulty]);
      }

      this.props.onScoreChange(newScore);
      this.setState({
        ...this.state,
        activeTargets: _.pull(activeTargets, id),
        difficulty: newDifficulty,
      });
    }
  }
  resetGame() {
    this.props.onScoreChange(0);

    this.setState({
      ...this.state,
      activeTargets: [],
      difficulty: 0,
      gameOver: false
    }, () => {
      this.toggleGameplay();
    });
  }
  render() {
    const score = {
      current: this.props.currentScore,
      high: this.props.highScore,
    };

    return (
      <Game
        toggleGameplay={this.toggleGameplay}
        resetGame={this.resetGame}
        onWhack={this.onWhack}
        score={score}
        {...this.state}/>
    );
  }
}

GameContainer.PropTypes = {
  currentScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentScore: state.game.currentScore,
  highScore: state.game.highScore,
});

const mapDispatchToProps = (dispatch) => ({
  onScoreChange: (newScore) => dispatch(saveCurrentScore(newScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
