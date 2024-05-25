import { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelColor?: string;
  containerClassName?: string;
  error?: string | null;
}

export default function Input({
  name,
  label,
  labelColor = 'text-black',
  containerClassName,
  error,
  ...rest
}: Props) {
  const { register, control } = useFormContext();
  const { type = 'text' } = rest;

  return (
    <section className={cn('flex flex-col w-full', containerClassName)}>
      <label htmlFor={name} className={cn('mb-6 font-medium', labelColor)}>
        {label}
      </label>
      <input
        id={name}
        className={cn(
          'h-10 border-y-2 border-x-8 border-solid border-yellow-200 hover:border-yellow-50 focus:border-indigo active:border-yellow-50 rounded-3xl p-2 text-center placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:border-transparent',
        )}
        {...register(name)}
        {...rest}
      />
      <div className="h-4 my-4">
        <p className="text-red-100 text-xs">{error}</p>
      </div>
    </section>
  );
}
