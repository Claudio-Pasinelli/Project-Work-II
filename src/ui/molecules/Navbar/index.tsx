import { Link, useLocation, useParams } from 'react-router-dom';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { ROUTES } from '../../../utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AvatarNavBar from '../AvatarNavBar';
import { A } from '../../atoms';

const Navbar = () => {
  const location = useLocation();
  const params = useParams();

  const [pageName, setPageName] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const checkUserRegistration = async () => {
    try {
      const res = await axios.get('http://localhost:4000/me');
      if (res.data.length > 0) {
        setIsUserRegistered(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkUserRegistration();
  }, []);

  useEffect(() => {
    if (location.pathname === ROUTES.home || location.pathname === '') {
      setPageName('HOME');
    } else if (location.pathname === ROUTES.contacts) {
      setPageName('CONTATTAMI');
    } else if (location.pathname === ROUTES.profile) {
      setPageName('PROFILO');
    } else if (location.pathname === ROUTES.myRecipes) {
      setPageName('LE MIE RICETTE');
    } else if (location.pathname.startsWith(ROUTES.myRecipesForm)) {
      if (params.id) {
        setPageName('MODIFICA UNA RICETTA');
      } else {
        setPageName('NUOVA RICETTA');
      }
    } else if (location.pathname === ROUTES.settings) {
      setPageName('IMPOSTAZIONI');
    } else {
      setPageName('');
    }
  }, [location.pathname, params.id]);

  return (
    <nav className="sticky top-0 z-50 w-full h-20 min-h-28 flex justify-between items-center bg-yellow-200 py-2 px-4 shadow-xl">
      <section className="w-full flex justify-start items-center">
        <A href={location.pathname === ROUTES.home ? undefined : ROUTES.home}>
          <img
            src="logo.png"
            alt="Logo Ricette della Nonna"
            className={cn(
              'w-48 h-auto my-auto',
              location.pathname === ROUTES.home
                ? ''
                : 'transform transition duration-300 hover:-translate-y-1',
            )}
          />
        </A>

        <h1 className="text-white font-bold">{pageName}</h1>
      </section>
      <section className="flex items-center">
        <div className="border-0 border-none flex flex-col items-start mr-8 pl-8 sm:border-l-2 sm:border-black-50">
          <section className="w-full flex justify-end items-center">
            {location.pathname !== ROUTES.home && (
              <Link
                to={ROUTES.home}
                className={cn(
                  'text-white',
                  location.pathname === ROUTES.home
                    ? 'bg-black-50 p-2 rounded-2xl'
                    : 'bg-none p-0 rounded-none',
                )}>
                Home
              </Link>
            )}
            {location.pathname !== ROUTES.contacts && (
              <Link
                to={ROUTES.contacts}
                className={cn(
                  'text-white ml-4',
                  location.pathname === ROUTES.contacts
                    ? 'bg-black-50 p-2 rounded-2xl'
                    : 'bg-none p-0 rounded-none',
                )}>
                Contattami
              </Link>
            )}
            {isUserRegistered && location.pathname !== ROUTES.myRecipes && (
              <Link
                to={ROUTES.myRecipes}
                className={cn(
                  'text-white ml-4',
                  location.pathname === ROUTES.myRecipes
                    ? 'bg-black-50 p-2 rounded-2xl'
                    : 'bg-none p-0 rounded-none',
                )}>
                Le mie ricette
              </Link>
            )}
          </section>
        </div>
        <AvatarNavBar />
      </section>
    </nav>
  );
};

export default Navbar;
