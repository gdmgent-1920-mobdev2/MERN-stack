import { default as React } from 'react';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../routes';

const Navigation = ({children}) => {
  return (
    <nav class="navbar navbar-expand-lg  navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="static/images/logo192.png" width="30" height="30" class="d-inline-block align-top" alt="" />
        Grafische en Digitale Media
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.LANDING}>Home</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.POSTS}>Nieuws</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.CONTACT}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;