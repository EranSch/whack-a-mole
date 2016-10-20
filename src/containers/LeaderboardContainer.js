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
    leaders = leaders.concat([currentPlayer]);
    leaders = sortBy(leaders, ({ score }) => score * -1);
  }

  return {
    leaders: leaders,
    isFetching: state.leaderboard.isFetching,
  };
}

export default connect(mapStateToProps)(LeaderboardContainer);
