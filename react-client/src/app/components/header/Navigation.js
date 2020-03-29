import { default as React } from 'react';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../routes';

const Navigation = ({children}) => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink activeClassName="active" to={Routes.LANDING}>Home</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={Routes.POSTS}>Posts</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={Routes.CONTACT}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;