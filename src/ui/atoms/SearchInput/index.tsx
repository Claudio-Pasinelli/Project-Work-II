import { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';
import Button from '../Button';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClassName?: string;
  error?: string | null;
}

export default function SearchInput({ name, containerClassName, error, ...rest }: Props) {
  const handleSearch = () => {
    return;
  };

  return (
    <section
      className={cn(
        'w-80 h-10 flex items-center border border-gray-300 bg-white rounded-3xl',
        containerClassName,
      )}>
      <input
        id={name}
        className={cn(
          'h-full flex-grow bg-white rounded-l-3xl p-2 text-center placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300',
        )}
        placeholder="Cerca una ricetta"
        {...rest}
        type="text"
      />
      <Button
        iconName={'search'}
        iconColor="black"
        onChange={handleSearch}
        title="Cerca"
        className="!max-w-12 !min-w-12 h-full p-2 bg-gray-50 border-l border-gray-300 rounded-l-none"
      />
      {error && (
        <div className="w-full mt-2">
          <p className="text-red-600 border border-gray-200 text-xs text-center">{error}</p>
        </div>
      )}
    </section>
  );
}
