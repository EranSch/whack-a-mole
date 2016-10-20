import React from 'react';
import { connect } from 'react-redux';

import { savePlayerName } from '../redux/modules/Game/actionCreators';
import NamePrompt from '../components/NamePrompt';

const NamePromptContainer = ({ name, onSubmit }) => {
  return (
    <div>
      {!name ?
        <NamePrompt onSubmit={onSubmit}/>
      : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.game.playerName,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name) => dispatch(savePlayerName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NamePromptContainer);
