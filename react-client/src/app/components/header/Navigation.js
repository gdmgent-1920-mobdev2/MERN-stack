import { default as React } from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as Routes from '../../routes';

const Navigation = ({children}) => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-light bg-light">
      <Link className="navbar-brand" to={Routes.LANDING}>
        <img src="static/images/logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
        Grafische en Digitale Media
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.LANDING}>Home</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.POSTS}>Nieuws</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.CONTACT}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;