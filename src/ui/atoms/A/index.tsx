import { AnchorHTMLAttributes, ReactElement } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  href: string;
  children?: ReactElement;
  className?: string;
}

const A = ({ text, href, children, className, ...rest }: Props) => {
  return (
    <a
      href={href}
      className={cn(
        'w-fit place-self-center text-yellow-100 underline underline-offset-4',
        className ? className : null,
      )}
      {...rest}>
      {text ? text : children ? children : null}
    </a>
  );
};

export default A;
