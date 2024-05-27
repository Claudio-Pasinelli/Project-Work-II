import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils';
import {
  HomePage,
  Layout,
  LoginPage,
  SignInPage,
  PasswordRecoveryPage,
  PasswordRecoveryConfirmPage,
  ContactsPage,
  MyRecipesPage,
  MyRecipesFormPage,
  OtherUserPage,
} from '../ui';
import SettingsPage from '../ui/pages/Settings';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.contacts} element={<ContactsPage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />
          <Route path={ROUTES.myRecipes} element={<MyRecipesPage />} />
          <Route path={ROUTES.myRecipesForm + '/:id?'} element={<MyRecipesFormPage />} />
          <Route path={`${ROUTES.users}/:userId`} element={<OtherUserPage />} />
        </Route>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signIn} element={<SignInPage />} />
        <Route path={ROUTES.passwordRecovery} element={<PasswordRecoveryPage />} />
        <Route path={ROUTES.passwordRecoveryConfirm} element={<PasswordRecoveryConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
