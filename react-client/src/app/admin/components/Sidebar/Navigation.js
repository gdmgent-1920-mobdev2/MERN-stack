import { default as React } from 'react';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../../routes';

import './Sidebar.scss';


const Navigation = ({children}) => {
  return (
    <nav className="navigation">
      <ul className="">
        <li className="nav-item">
          <button className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePosts" aria-expanded="false" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Posts</span>
          </button>
          <div id="collapsePosts" className="collapse" aria-labelledby="headingTwo" data-parent="#sidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <NavLink className="collapse-item" activeClassName="active" to={Routes.BACKOFFICE_POSTS}>Overview Posts</NavLink>
              <NavLink className="collapse-item" activeClassName="active" to={Routes.BACKOFFICE_POSTS_CREATE}>Create a new post</NavLink>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;