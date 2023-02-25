import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';

const PublicRouter = ({ isAuthentication }) => {
  return <div>{isAuthentication ? <Navigate to="/home" /> : <Outlet />}</div>;
};

PublicRouter.propTypes = { isAuthentication: propTypes.boolean };
export default PublicRouter;
