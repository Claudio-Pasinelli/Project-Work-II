import { InputHTMLAttributes, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../utils/hooks';
import IconSvg from '../IconSVG';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { RecipesTypes } from '../../../utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  options: Array<RecipesTypes>;
  error?: string | null;
  onOptionChange?: (selectedType: string) => void;
}

const DropdownFilter = ({ name, placeholder, options, error, onOptionChange, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(options[0].value ?? '');

  useOnClickOutside(ref, () => setOpen(false));
  return (
    <section className="w-40 flex flex-col relative ml-8 sm:ml-12 md:ml-14 lg:ml-16">
      <div onClick={() => setOpen(!open)} role="button" tabIndex={0} ref={ref}>
        <div className="flex flex-col rounded-full">
          <div
            className={cn(
              'shadow-xl bg-gray-50 border border-solid inline-flex w-full justify-between gap-x-1.5 items-center',
              open ? 'rounded-t-[1.563rem]' : 'rounded-[1.563rem]',
            )}>
            <input
              readOnly
              id={name}
              value={inputValue}
              defaultValue={options[0].value}
              className={cn(
                'w-full  p-2 bg-gray-50 text-center cursor-pointer outline-none md:p-[0.938rem]',
                open ? 'rounded-t-[1.563rem]' : 'rounded-[1.563rem]',
              )}
              placeholder={placeholder}
              {...rest}
            />

            <IconSvg
              name={open ? 'dropUp' : 'dropDown'}
              size={30}
              iconClassName="bg-gray-50 text-purple mr-2"
            />
          </div>
        </div>
        <div
          className={cn(
            'w-full absolute flex flex-col items-center border border-x-purple shadow-xl rounded-b-[1.563rem] overflow-hidden transition-all duration-300 ease-in-out',
            open ? 'block' : 'hidden',
          )}>
          <ul>
            {options.map((option, index) => (
              <li
                key={option.id}
                className={cn(
                  'w-full text-center overflow-hidden border py-2 border-b-purple hover:text-purple',
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50',
                )}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(false);
                    setInputValue(option.value);
                    onOptionChange && onOptionChange(option.value);
                  }}>
                  {option.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-4 my-4">
          <p className="text-red-100 text-xs">{error}</p>
        </div>
      </div>
    </section>
  );
};

export default DropdownFilter;
