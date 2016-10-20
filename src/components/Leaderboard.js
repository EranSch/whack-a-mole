import React, { PropTypes } from 'react';

const Leaderboard = ({ leaders }) => (
  <div>
    {leaders.map(({ avatar, name, score }, i) => (
      <div key={i} className="leaderboard__leader">

        <div className="leaderboard__avatar-container">
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : null}
        </div>

        <span className="leaderboard__score">
          {score}
        </span>

        <span className="leaderboard__name">
          {name}
        </span>

      </div>
    ))}
  </div>
);

Leaderboard.propTypes = {
  leaders: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Leaderboard;
