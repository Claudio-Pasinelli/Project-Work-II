import { useRef, useState } from 'react';
import IconSvg from '../../atoms/IconSVG';
import { useOnClickOutside } from '../../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES, removeEmailCookies } from '../../../utils';
import { Button } from '../../atoms';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props {
  email?: string | null | undefined;
}

const Avatar = ({ email }: Props) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!open);
  };

  useOnClickOutside(ref, handleOpenModal);

  return (
    <div>
      <figure
        className="size-11 flex bg-gray-50 border border-black rounded-full justify-center items-center cursor-pointer"
        onClick={handleOpenModal}>
        <IconSvg name="avatar" size={22} />
      </figure>
      {open ? (
        <div
          ref={ref}
          className={cn(
            'flex flex-col justify-around items-center absolute top-[15%] right-[4%] p-2 bg-white border border-gray-100 rounded-3xl',
            email ? 'w-56 h-36' : 'w-44 h-30',
          )}>
          {email ? (
            <section className="w-full flex justify-between">
              {/* fare il collegamento con settings*/}
              <IconSvg name="settings" size={20} className="cursor-pointer" />
              <p>Impostazioni</p>
            </section>
          ) : null}

          {email ? <section className="w-full h-[1px] bg-gray-200" /> : null}
          {email ? (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="logout"
                className="!w-fit sm:!w-fit"
                onClick={() => (navigate(ROUTES.login), removeEmailCookies())}
              />
              <p
                className="text-red cursor-pointer"
                onClick={() => (navigate(ROUTES.login), removeEmailCookies())}>
                Logout
              </p>
            </section>
          ) : (
            <section className="w-full flex justify-between items-center">
              <Button
                iconName="login"
                className="!w-fit sm:!w-fit"
                onClick={() => navigate(ROUTES.login)}
              />
              <p
                className="text-green cursor-pointer"
                onClick={() => (location.pathname = ROUTES.login)}>
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
