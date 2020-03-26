import { default as React } from 'react';

import { Header } from '../components';

const PageLayout = ({children}) => {
  return (
    <div className="page">
      <Header />
      <main className="page__main">
        {children}
      </main>
      <footer className="page__footer">
        FOOTER
      </footer>
    </div>
  );
};

export default PageLayout;