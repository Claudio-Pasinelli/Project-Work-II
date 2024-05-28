import { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';
import IconSvg from '../IconSVG';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClassName?: string;
  error?: string | null;
}

export default function SearchInput({ name, containerClassName, error, ...rest }: Props) {
  return (
    <section
      className={cn(
        'w-80 h-10 flex items-center border border-gray-300 bg-white rounded-3xl shadow-xl',
        containerClassName,
      )}>
      <input
        id={name}
        className={cn(
          'max-w-full min-w-[25%] h-full flex-grow bg-white rounded-l-3xl p-2 text-center placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300',
        )}
        placeholder="Cerca una ricetta"
        {...rest}
        type="text"
      />
      <IconSvg name="search" size={24} iconClassName="w-[12%]" />
      {error && (
        <div className="w-full mt-2">
          <p className="text-red-100-600 border border-gray-200 text-xs text-center">{error}</p>
        </div>
      )}
    </section>
  );
}
