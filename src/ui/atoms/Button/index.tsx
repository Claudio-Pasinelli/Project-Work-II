import { cn } from '../../../utils/helpers/tailwindMerge';
import { ButtonHTMLAttributes } from 'react';
import IconSvg, { ReactIconsName } from '../IconSVG';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  titleSize?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconName?: ReactIconsName;
  className?: string;
  iconClassName?: string;
}

export default function Button({
  title,
  titleSize = 'text-xs',
  backgroundColor = 'bg-purple',
  textColor = 'text-white',
  iconColor,
  className,
  iconClassName,
  iconName,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'w-full flex items-center h-10 pr-1.5 rounded-3xl text-center sm:w-44',
        backgroundColor,
        textColor,
        className,
      )}
      type="button"
      {...rest}>
      <section className="flex w-full justify-center items-center place-content-center">
        {!!iconName && (
          <IconSvg
            name={iconName}
            iconColor={iconColor}
            size={24}
            iconClassName={(cn('my-0 mr-1 sm:ml-2 lg:mr-4 lg:ml-5'), iconClassName)}
          />
        )}
        <p className={cn('font-medium', titleSize)}>{title}</p>
      </section>
    </button>
  );
}
