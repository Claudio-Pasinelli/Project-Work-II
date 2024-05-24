import { InputHTMLAttributes, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../utils/hooks';
import IconSvg from '../IconSVG';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { RecipesTypes } from '../../../utils';
import { useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  variant?: 'primary' | 'secondary';
  placeholder?: string;
  containerClassName?: string;
  options: Array<RecipesTypes>;
  error?: string | null;
}

const Dropdown = ({
  label,
  name,
  variant = 'secondary',
  placeholder,
  containerClassName,
  options,
  error,
  ...rest
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(options[0].value ?? '');

  useOnClickOutside(ref, () => setOpen(false));
  // const { register, control } = useFormContext();

  return (
    <section className={cn('flex flex-col relative w-full lg:w-full', containerClassName)}>
      <div onClick={() => setOpen(!open)} role="button" tabIndex={0} ref={ref}>
        <div className="flex flex-col">
          <label htmlFor={name} className="mb-[0.688rem] font-medium flex flex-row justify-between">
            {label?.toLocaleUpperCase()}
          </label>

          <div
            className={cn(
              'border border-solid font-light inline-flex w-full justify-between gap-x-1.5 items-center',
              // inputVariant[variant],
            )}>
            <input
              readOnly
              id={name}
              value={inputValue}
              className="bg-gray-50 w-full cursor-pointer outline-none p-2 md:p-[0.938rem]"
              placeholder={placeholder}
              // {...register(name)}
              {...rest}
            />

            {/* <IconSvg name={open ? 'dropUp' : 'dropDown'} size={30} className="text-purple mr-2" /> */}
          </div>
        </div>
        <div
          className={cn(
            'absolute grid w-full flex-col items-center border border-x-purple overflow-hidden transition-all duration-300 ease-in-out',
            open ? 'block' : 'hidden',
          )}>
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                className="w-full text-center text-sm overflow-hidden border py-2 bg-gray-50 border-b-purple hover:text-purple">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(false);
                    setInputValue(option.value);
                  }}>
                  {option.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-4 my-4">
          <p className="text-red text-xs">{error}</p>
        </div>
      </div>
    </section>
  );
};

export default Dropdown;
