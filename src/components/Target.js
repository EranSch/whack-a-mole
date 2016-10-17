import React from 'react';
import cn from 'classnames';

const Target = ({ id, isActive, onWhack }) => {
  return (
    <button
      onClick={() => onWhack(id)}
      className={cn(
      'target',
      { 'target--active': isActive }
    )}>
      { isActive ? 'X' : 'O'}
    </button>
  );
};

export default Target;
