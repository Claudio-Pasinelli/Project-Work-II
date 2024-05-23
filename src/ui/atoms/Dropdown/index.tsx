import { SelectHTMLAttributes } from 'react';
import { RecipesTypes } from '../../../utils';
import { useFormContext } from 'react-hook-form';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  data: RecipesTypes[];
}

const Dropdown = ({ name, data, ...rest }: Props) => {
  //   const { register, control } = useFormContext();

  return (
    <article>
      {/* <select id={name} {...register(name)} {...rest}> */}
      <select id={name} {...rest}>
        {data.map((item) => (
          <option key={item.name + item.value}>{item.name}</option>
        ))}
      </select>
    </article>
  );
};

export default Dropdown;
