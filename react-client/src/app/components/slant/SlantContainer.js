import { default as React, Fragment } from 'react';
import { default as classnames } from 'classnames';

import './SlantContainer.scss';

const SlantContainer = ({ children, shape = 1, color = 'black-700' }) => {
  return (
    <div className={classnames('slant-container', `slant-container--shape-${shape}`, `slant-container--color-${color}`)}>
      { children }
    </div>
  );
};

export default SlantContainer;