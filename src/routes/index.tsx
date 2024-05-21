import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils';
import {
  HomePage,
  Layout,
  LoginPage,
  SignInPage,
  PasswordRecoveryPage,
  // RequireAuth,
  ContactsPage,
  MyRecipesPage,
  MyRecipesNewPage,
} from '../ui';
import SettingsPage from '../ui/pages/Settings';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route element={<RequireAuth />}> */}
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.contacts} element={<ContactsPage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />
          <Route path={ROUTES.myRecipes} element={<MyRecipesPage />} />
          <Route path={ROUTES.myRecipesNew} element={<MyRecipesNewPage />} />
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
