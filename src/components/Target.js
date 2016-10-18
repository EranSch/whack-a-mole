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
      <div className="tube"></div>
      <img src={require(`../assets/trumps/${id}.png`)} className="head" alt="Click Me!"/>
    </button>
  );
};

export default Target;
