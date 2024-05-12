import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { getTokenCookies } from '../../../utils';

function RequireAuth(): JSX.Element {
  // const { token } = getTokenCookies();
  // const location = useLocation();

  // if (!token) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return <Outlet />;
}

export default RequireAuth;
