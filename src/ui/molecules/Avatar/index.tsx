import { useRef, useState } from 'react';
import IconSvg from '../../atoms/IconSVG';
import { useOnClickOutside } from '../../../utils/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, removeEmailCookies } from '../../../utils';
import { Button } from '../../atoms';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props {
  email?: string | null | undefined;
}

const Avatar = ({ email }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative">
      <figure
        className="size-11 flex bg-gray-50 border border-black rounded-full justify-center items-center cursor-pointer"
        onClick={() => setOpen(true)}
        // eslint-disable-next-line quotes
        title={email ? '' : "Non hai effettuato l'accesso"}>
        <IconSvg name="avatar" size={22} />
      </figure>
      {open ? (
        <div
          ref={ref}
          className={cn(
            'flex flex-col justify-around items-center absolute top-full mt-2 right-0 p-2 bg-white border border-gray-100 rounded-3xl shadow-xl',
            email && location.pathname !== ROUTES.settings ? 'w-56 h-36' : 'w-44 h-30',
          )}>
          {email && location.pathname !== ROUTES.settings && (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="settings"
                className="!w-fit sm:!w-fit"
                iconClassName="m-0"
                onClick={() => navigate(ROUTES.settings)}
              />
              <p className="cursor-pointer" onClick={() => navigate(ROUTES.settings)}>
                Impostazioni
              </p>
            </section>
          )}

          {email && location.pathname !== ROUTES.settings && (
            <section className="w-full h-[1px] bg-gray-200" />
          )}
          {email ? (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="logout"
                className="!w-fit sm:!w-fit"
                iconClassName="m-0"
                onClick={() => {
                  navigate(ROUTES.login);
                  removeEmailCookies();
                }}
              />
              <p
                className="text-red cursor-pointer"
                onClick={() => {
                  navigate(ROUTES.login);
                  removeEmailCookies();
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
                onClick={() => navigate(ROUTES.login)}
              />
              <p className="text-green cursor-pointer" onClick={() => navigate(ROUTES.login)}>
                Login
              </p>
            </section>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Avatar;
