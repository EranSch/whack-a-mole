import { sortBy } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLeaders } from '../redux/modules/Leaderboard/actionCreators';
import Leaderboard from '../components/Leaderboard';
import Loading from '../components/Loading';

class LeaderboardContainer extends Component {
  componentDidMount() {
    const { dispatch, leaders } = this.props;
    if (leaders === null) {
      dispatch(getLeaders());
    }
  }

  render() {
    const { isFetching, leaders } = this.props;
    return (
      <div className="leaderboard">

        {isFetching ?
          <Loading/>
        : null}

        {leaders !== null ? (
          <Leaderboard leaders={leaders} />
        ) : null}

      </div>
    );
  }
}

LeaderboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  leaders: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  )
};

const mapStateToProps = (state) => {
  let leaders = state.leaderboard.leaders;

  if (leaders) {
    const currentPlayer = {
      name: state.game.playerName || 'You',
      score: state.game.highScore,
      avatar: 'images/avatars/user.jpg',
    };
    /*
     Take care not to mutate the leaders object.  This is similar
     to the rule described in Game/reducer.js, though more stringent.

     In addition to ensuring that oldProps !== newProps, Redux also compares
     the properties (non-recursively) of newProps vs. oldProps using a !==
     test.  So even though this function creates a new object on every run
     ("return { ... }"), Redux will still calculate that the props are unchanged
     and suppress re-rendering if the values haven't changed.

     As described in Game/reducer.js, mutating an Object will still cause
     oldObject === newObject.  Instead we use functional programming principles
     to create a new object with each change.  lodash methods are good for this.
     */
    leaders = leaders.concat([currentPlayer]);
    leaders = sortBy(leaders, ({ score }) => score * -1);
  }

  return {
    leaders: leaders,
    isFetching: state.leaderboard.isFetching,
  };
}

export default connect(mapStateToProps)(LeaderboardContainer);
