import { cn } from '../../../utils/helpers/tailwindMerge';
import { ButtonHTMLAttributes } from 'react';
import IconSvg, { ReactIconsName } from '../IconSVG';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  title?: string;
  textSize?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconName?: ReactIconsName;
  className?: string;
  iconClassName?: string;
}

export default function Button({
  text,
  title,
  textSize = 'text-xs',
  backgroundColor = 'bg-gray-100',
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
        'w-full flex justify-center items-center h-10 pr-1.5 rounded-3xl text-center sm:min-w-28 sm:w-44 sm:max-w-44',
        backgroundColor,
        textColor,
        className,
      )}
      title={title}
      type="button"
      {...rest}>
      <section className="flex w-auto justify-center items-center place-content-center">
        {!!iconName && (
          <IconSvg
            name={iconName}
            iconColor={iconColor}
            size={24}
            iconClassName={(cn('my-0 mr-1 sm:ml-2 lg:mr-4 lg:ml-5'), iconClassName)}
          />
        )}
        {text ? <p className={cn('ml-3 font-medium', textSize)}>{text}</p> : null}
      </section>
    </button>
  );
}
