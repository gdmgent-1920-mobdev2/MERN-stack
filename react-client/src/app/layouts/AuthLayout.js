import React, { Fragment, useState } from 'react';

import './AuthLayout.scss';

const AuthLayout = ({ children }) => {

  return (
    <div className="auth">
      {children}
    </div>
  )
};
export default AuthLayout;