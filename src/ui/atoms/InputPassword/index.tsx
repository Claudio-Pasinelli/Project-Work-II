import { InputHTMLAttributes, useState } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { useFormContext } from 'react-hook-form';
import Button from '../Button';
import { ReactIconsName } from '../IconSVG';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelColor?: string;
  containerClassName?: string;
  error?: string | null;
}

export default function InputPassword({
  label,
  labelColor = 'text-white',
  name,
  containerClassName,
  error,
  ...rest
}: Props) {
  const { register, control } = useFormContext();
  const { type = 'password' } = rest;

  const [inputType, setInputType] = useState(type);
  const [eyeState, setEyeState] = useState<ReactIconsName | undefined>('eyeOn');

  const handleEye = () => {
    if (inputType === 'password') {
      setEyeState('eyeOff');
      setInputType('text');
    } else {
      setEyeState('eyeOn');
      setInputType('password');
    }
  };

  return (
    <section className={cn('relative flex flex-col w-full', containerClassName)}>
      <label htmlFor={name} className={cn('mb-6 font-medium', labelColor)}>
        {label}
      </label>
      <input
        id={name}
        className={cn(
          'h-10 border-y-2 border-x-8 border-solid border-yellow-100 hover:border-yellow-50 rounded-3xl p-2 text-center placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:border-transparent',
        )}
        {...register(name)}
        {...rest}
        type={inputType}
      />
      <Button
        onClick={handleEye}
        iconName={eyeState}
        iconColor="black"
        className="!w-fit absolute top-1/2 right-5 transform -translate-y-1/2"
      />
      <div className="h-4 my-4">
        <p className="text-red text-xs">{error}</p>
      </div>
    </section>
  );
}
