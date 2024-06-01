import { useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from '../../../utils/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils';
import { Button, IconSVG } from '../../atoms';
import { cn } from '../../../utils/helpers/tailwindMerge';
import axios from 'axios';

const AvatarNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meName, setMeName] = useState('');

  useOnClickOutside(ref, () => setOpen(false));

  const fetchMe = async () => {
    try {
      const res = await axios.get('http://localhost:4000/me');
      const meData = res.data[0];
      if (meData) {
        const nameParts = meData.name.split(' ');
        let initials = '';
        if (nameParts.length === 1) {
          initials = nameParts[0].charAt(0) + nameParts[0].charAt(nameParts[0].length - 1);
        } else {
          initials = nameParts.map((part: string) => part.charAt(0)).join('');
        }
        setUsername(initials.toUpperCase());
        setIsLoggedIn(true);
        setMeName(meData.name);
      } else {
        setIsLoggedIn(false);
        setMeName('Non Registrato');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div className="relative">
      <figure
        className="size-11 flex bg-gray-50 border border-black rounded-full justify-center items-center cursor-pointer shadow-xl"
        onClick={() => setOpen(true)}
        // eslint-disable-next-line quotes
        title={isLoggedIn ? meName : "Non hai effettuato l'accesso"}>
        {isLoggedIn ? <p>{username}</p> : <IconSVG name="avatar" size={24} />}
      </figure>
      {open && (
        <div
          ref={ref}
          className={cn(
            'flex flex-col justify-around items-center absolute top-full mt-2 right-0 p-2 bg-white border border-gray-100 rounded-3xl shadow-xl',
            isLoggedIn && location.pathname !== ROUTES.settings ? 'w-56 h-36' : 'w-44 h-30',
          )}>
          {isLoggedIn && meName && location.pathname !== ROUTES.settings && (
            <>
              <section className="w-full flex justify-between items-center hover:bg-gray-100 rounded-full">
                <Button
                  iconName="settings"
                  title="Impostazioni"
                  className="!w-fit !min-w-fit !max-w-fit sm:!w-fit sm:!min-w-fit sm:!max-w-fit"
                  backgroundColor="h-fit bg-white !p-0"
                  iconClassName="m-0"
                  onClick={() => {
                    navigate(ROUTES.settings);
                    setOpen(false);
                  }}
                />
                <p
                  title="Impostazioni"
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(ROUTES.settings);
                    setOpen(false);
                  }}>
                  Impostazioni
                </p>
              </section>
              <section className="w-full h-[1px] bg-gray-200" />
            </>
          )}
          {isLoggedIn ? (
            <section className="w-full flex justify-between items-center pb-1 hover:bg-gray-100 rounded-full">
              <Button
                iconName="logout"
                title="Esci"
                className="!w-fit !min-w-fit !max-w-fit sm:!w-fit sm:!min-w-fit sm:!max-w-fit"
                backgroundColor="h-fit bg-white !p-0"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                }}
              />
              <p
                title="Esci"
                className="text-red-100 cursor-pointer"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                }}>
                Logout
              </p>
            </section>
          ) : (
            <section className="w-full flex justify-between items-center pb-1 hover:bg-gray-100 rounded-full">
              <Button
                iconName="login"
                title="Accedi"
                className="!w-fit !min-w-fit !max-w-fit sm:!w-fit sm:!min-w-fit sm:!max-w-fit"
                backgroundColor="h-fit bg-white !p-0"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.login);
                  setOpen(false);
                }}
              />
              <p
                title="Accedi"
                className="text-green-50 cursor-pointer"
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

export default AvatarNavBar;
