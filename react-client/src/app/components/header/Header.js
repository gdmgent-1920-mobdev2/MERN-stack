import { default as React } from 'react';
import Navigation from './Navigation';

const Header = ({children}) => {
  return (
    <header className="page__header">
      <Navigation />
    </header>
  );
};

export default Header;