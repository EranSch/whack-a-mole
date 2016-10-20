import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLeaders } from '../redux/modules/Leaderboard/actionCreators';
import Leaderboard from '../components/Leaderboard';

class LeaderboardContainer extends Component {
  componentDidMount() {
    const { dispatch, leaders } = this.props;
    if (leaders === null) {
      dispatch(getLeaders());
    }
  }

  render() {
    const { leaders } = this.props;
    return (
      <div className="leaderboard">

        {leaders !== null ? (
          <Leaderboard leaders={leaders} />
        ) : null}

      </div>
    );
  }
}

LeaderboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  leaders: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  )
};

const mapStateToProps = (state) => ({
  leaders: state.leaderboard.leaders,
});

export default connect(mapStateToProps)(LeaderboardContainer);
