import { AnchorHTMLAttributes, ReactElement } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  href: string;
  children?: ReactElement;
  icon?: boolean;
  className?: string;
}

const A = ({ text, href, children, icon = false, className, ...rest }: Props) => {
  return (
    <a
      href={href}
      className={cn(
        'w-fit place-self-center text-yellow-200 underline underline-offset-4',
        icon ? 'bg-white rounded-full' : null,
        className ? className : null,
      )}
      {...rest}>
      {text ? text : children ? children : null}
    </a>
  );
};

export default A;
