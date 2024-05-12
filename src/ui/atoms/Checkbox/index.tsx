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

export default function Checkbox({
  label,
  labelColor = 'text-white',
  name,
  containerClassName,
  error,
  ...rest
}: Props) {
  const { register, control } = useFormContext();

  return (
    <section className={cn('flex w-full', containerClassName)}>
      <input
        id={name}
        className={cn(
          'border border-solid rounded-3xl p-2 text-center focus:outline-none focus:ring-2 focus:border-transparent md:p-4',
        )}
        type="checkbox"
        {...register(name)}
        {...rest}
      />
      <label htmlFor={name} className={cn('self-center font-medium ml-1', labelColor)}>
        {label}
      </label>
      <div className="h-4 my-4">
        <p className="text-red-50 text-xs">{error}</p>
      </div>
    </section>
  );
}
