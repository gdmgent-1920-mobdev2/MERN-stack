import React, { Fragment, useState } from 'react';
import { Sidebar } from '../admin/components';

import './BackofficeLayout.scss';

const BackofficeLayout = ({ children }) => {

  return (
    <div className="backoffice">
      
      <Sidebar />
      {children}
    </div>
  )
};
export default BackofficeLayout;