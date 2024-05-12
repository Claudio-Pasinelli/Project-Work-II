import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils';
import {
  HomePage,
  Layout,
  LoginPage,
  SignInPage,
  PasswordRecoveryPage,
  RequireAuth,
  ContactsPage,
} from '../ui';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route element={<RequireAuth />}> */}
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.contacts} element={<ContactsPage />} />
          {/* </Route> */}
        </Route>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signIn} element={<SignInPage />} />
        <Route path={ROUTES.recuperoPassword} element={<PasswordRecoveryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
