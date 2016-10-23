import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import toastr, { warning as warningToast, remove as hideToasts } from 'toastr';

import Game from '../components/Game';
import { getQuote } from '../redux/modules/Quote/actionCreators';
import { saveCurrentScore } from '../redux/modules/Game/actionCreators';

toastr.options = {
  "positionClass": "toast-top-full-width",
};

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

      /*
       Updating the score is a seemingly slow process.

       Whenever the player earns a point, this component calls an
       action creator to create an action.  The action broadcasts
       ("dispatches") the new score to all of the reducers.  The
       Game reducer sees the action and recalculates its state.
       Redux detects that the application state has changed and
       recalculates every container with a mapStateToProps function.
       If the result of mapStateToProps is different from the last
       iteration, the container and its component tree re-renders.
       This re-render includes the updated score, which updates the
       UI.

       But all of this work happens in an instant!  And we get the
       benefits of a central application state.
       */
      this.props.onScoreChange(newScore);
      this.props.onWhack();
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
  onWhack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentScore: state.game.currentScore,
  highScore: state.game.highScore,
  playerName: state.game.playerName,
});

/*
 By default, mapDispatchToProps() returns only the dispatch
 function.  So if you don't have any custom dispatches, you
 may call connect() with a falsey value (null, undefined, etc.).
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onScoreChange: (newScore) => dispatch(saveCurrentScore(newScore)),
});

/*
 mergeProps is an optional connect() parameter that receives the
 results of mapStateToProps() and mapDispatchToProps().  It is
 powerful, but also makes it easy to write logic that is not "Fluxy".

 The logic below achieves the intended effect, but could encourage
 anti-patterns because the result from the Quote API is accessed directly
 and not stored in state.  Continuing down this path could result in
 the same data stored in multiple places, undermining Flux's goal of a
 central application state.
 */
const mergeProps = (stateProps, dispatchProps) => {
  return _.assign({}, stateProps, dispatchProps, {
    onWhack: () => dispatchProps.dispatch(getQuote(stateProps.playerName))
      /*
       dispatch() is a Promise that, upon dispatching, resolves with the
       action that was dispatched.
       */
      .then(action => {
        hideToasts();
        warningToast(action.payload, 'Donald says');
      })
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GameContainer);
