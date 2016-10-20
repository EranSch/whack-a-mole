import React from 'react';
import GameContainer from './GameContainer';
import LeaderboardContainer from './LeaderboardContainer';
import NamePromptContainer from './NamePromptContainer';

const AppContainer = () => (
  <div>
    <NamePromptContainer />
    <GameContainer />
    <LeaderboardContainer />
  </div>
);

export default AppContainer;
