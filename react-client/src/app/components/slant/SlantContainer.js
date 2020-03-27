import { default as React} from 'react';
import { default as classnames } from 'classnames';

import './SlantContainer.scss';

const SlantContainer = ({ children, shape = 1, angle = 10, color = 'purple-700' }) => {
  return (
    <div className={classnames('slant-container', `slant-container--shape-${shape}`, `slant-container--color-${color}`)}>
      { children }
    </div>
  );
};

export default SlantContainer;