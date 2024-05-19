import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../utils/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, removeLoggedCookies, removeNameCookies } from '../../../utils';
import { Button } from '../../atoms';
import { cn } from '../../../utils/helpers/tailwindMerge';
import Cookies from 'js-cookie';
import { NAME } from '../../../utils/costants/auth';

interface Props {
  logged?: string | null | undefined;
}

const Avatar = ({ logged }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [initials, setInitials] = useState('');

  useOnClickOutside(ref, () => setOpen(false));

  const getInitials = (input: string): string => {
    const words = input.trim().split(/\s+/);
    if (words.length === 1) {
      const word = words[0];
      return word.charAt(0).toUpperCase() + word.charAt(word.length - 1).toUpperCase();
    }
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  useEffect(() => {
    const initialUsername = Cookies.get(NAME) || '';
    if (!initialUsername || initialUsername.length === 0) {
      setUsername('NR');
      setInitials('');
    } else {
      setUsername(initialUsername);
      setInitials(getInitials(initialUsername));
    }
  }, []);

  useEffect(() => {
    setInitials(getInitials(username));
  }, [username]);

  return (
    <div className="relative">
      <figure
        className="size-11 flex bg-gray-50 border border-black rounded-full justify-center items-center cursor-pointer"
        onClick={() => setOpen(true)}
        // eslint-disable-next-line quotes
        title={logged ? '' : "Non hai effettuato l'accesso"}>
        <p>{initials}</p>
      </figure>
      {open && (
        <div
          ref={ref}
          className={cn(
            'flex flex-col justify-around items-center absolute top-full mt-2 right-0 p-2 bg-white border border-gray-100 rounded-3xl shadow-xl',
            logged && location.pathname !== ROUTES.settings ? 'w-56 h-36' : 'w-44 h-30',
          )}>
          {logged && location.pathname !== ROUTES.settings && (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="settings"
                className="!w-fit sm:!w-fit"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.settings);
                  setOpen(false);
                }}
              />
              <p
                className="cursor-pointer"
                onClick={() => {
                  navigate(ROUTES.settings);
                  setOpen(false);
                }}>
                Impostazioni
              </p>
            </section>
          )}

          {logged && location.pathname !== ROUTES.settings && (
            <section className="w-full h-[1px] bg-gray-200" />
          )}
          {logged ? (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="logout"
                className="!w-fit sm:!w-fit"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                  removeLoggedCookies();
                  removeNameCookies();
                }}
              />
              <p
                className="text-red cursor-pointer"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                  removeLoggedCookies();
                  removeNameCookies();
                }}>
                Logout
              </p>
            </section>
          ) : (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="login"
                className="!w-fit sm:!w-fit"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                }}
              />
              <p
                className="text-green cursor-pointer"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                }}>
                Login
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
