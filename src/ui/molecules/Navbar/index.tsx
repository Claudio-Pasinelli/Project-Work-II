import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { ROUTES, getEmailCookies, removeEmailCookies } from '../../../utils';
import { useEffect, useState } from 'react';
import Avatar from '../Avatar';

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
    } else {
      setPageName('');
    }
  }, [location.pathname]);

  return (
    <nav className="w-full h-36 min-h-36 flex justify-between items-center bg-yellow-100 py-6 px-8 shadow-xl">
      <h1 className="text-white font-bold">{pageName}</h1>
      {/* cerca */}

      <section className="size-fit flex flex-col justify-between items-center border-l-2 border-black-50 gap-0 px-8 text-2xl text-b font-semibold sm:gap-8 sm:flex-row">
        {email && location.pathname != '/' ? (
          <Link
            to="/"
            className={cn(
              'text-white',
              location.pathname === '/'
                ? 'bg-black-50 p-2  rounded-2xl'
                : 'bg-none p-0 rounded-none',
            )}>
            Home
          </Link>
        ) : null}
        {location.pathname != '/contacts' ? (
          <Link
            to="/contacts"
            className={cn(
              'text-white',
              location.pathname === '/contact-us'
                ? 'bg-black-50 p-2  rounded-2xl'
                : 'bg-none p-0 rounded-none',
            )}>
            Contattaci
          </Link>
        ) : null}
        <Avatar email={email} />
      </section>
    </nav>
  );
};

export default Navbar;
