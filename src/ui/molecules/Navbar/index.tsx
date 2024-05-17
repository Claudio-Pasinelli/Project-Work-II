import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { ROUTES, getEmailCookies } from '../../../utils';
import { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { SearchInput } from '../../atoms';

const Navbar = () => {
  const location = useLocation();
  const { email } = getEmailCookies();

  const [pageName, setPageName] = useState('');

  useEffect(() => {
    if (location.pathname === ROUTES.home || location.pathname === '') {
      setPageName('HOME');
    } else if (location.pathname === ROUTES.contacts) {
      setPageName('CONTATTACI');
    } else if (location.pathname === ROUTES.profile) {
      setPageName('PROFILO');
    } else if (location.pathname === ROUTES.myRecipes) {
      setPageName('LE MIE RICETTE');
    } else if (location.pathname === ROUTES.settings) {
      setPageName('IMPOSTAZIONI');
    } else {
      setPageName('');
    }
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full h-20 min-h-28 flex justify-between items-center bg-yellow-100 py-2 px-4 shadow-xl">
      <h1 className="text-white font-bold">{pageName}</h1>
      <section className="flex items-center">
        <div className="border-l-2 border-black-50 flex flex-col items-start mr-8 pl-8">
          <SearchInput name="search" />
          <section className="w-full flex justify-end mt-4">
            {email && location.pathname !== '/' && (
              <Link
                to="/"
                className={cn(
                  'text-white',
                  location.pathname === '/'
                    ? 'bg-black-50 p-2 rounded-2xl'
                    : 'bg-none p-0 rounded-none',
                )}>
                Home
              </Link>
            )}
            {location.pathname !== '/contacts' && (
              <Link
                to="/contacts"
                className={cn(
                  'text-white ml-4',
                  location.pathname === '/contact-us'
                    ? 'bg-black-50 p-2 rounded-2xl'
                    : 'bg-none p-0 rounded-none',
                )}>
                Contattaci
              </Link>
            )}
          </section>
        </div>
        <Avatar email={email} />
      </section>
    </nav>
  );
};

export default Navbar;
