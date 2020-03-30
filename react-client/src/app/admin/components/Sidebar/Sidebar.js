import { default as React } from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../../../routes';
import Navigation from './Navigation';

import './Sidebar.scss';

const Sidebar = ({children}) => {
  return (
    <div className="navbar-nav sidebar accordion" id="accordionSidebar">
      <Link class="sidebar-brand d-flex align-items-center justify-content-center" to={Routes.BACKOFFICE_LANDING}>
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">GDM Admin <sup>2</sup></div>
      </Link>
      <hr className="sidebar-divider" />
      <Navigation />
    </div>
  );
};

export default Sidebar;