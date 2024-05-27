import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, A, InputPassword } from '../../../atoms';
import schema from '../validation';
import { ROUTES, User } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const defaultValues = {
  password: '',
  confirmPassword: '',
};

const Form = () => {
  const methods = useForm<User>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    trigger,
    reset,
    getValues,
    setError,
  } = methods;

  const navigate = useNavigate();

  const handleClickAccess = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    const password = getValues('password');
    const confirmPassword = getValues('confirmPassword');

    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Le due password non corrispondono.' });
      return;
    }

    try {
      const res = await axios.get('http://localhost:4000/me');
      const user = res.data[0];

      if (user) {
        await axios.put(`http://localhost:4000/users/${user.id}`, { ...user, password });
        handleReset();
        return navigate(ROUTES.login);
      } else {
        setError('email', { message: 'Utente non trovato.' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <FormProvider {...methods}>
      <section className="w-[33.75rem] h-full flex flex-col place-items-center rounded-3xl bg-yellow-200 sm:rounded-r-3xl sm:rounded-bl-none">
        <h1 className="w-full h-20 bg-orange text-4xl text-center text-white content-center text-5xl rounded-t-3xl shadow-xl sm:rounded-tr-3xl sm:rounded-tl-none">
          RECUPERO PASSWORD
        </h1>
        <article className="w-3/4 flex flex-col my-5 p-4 items-center bg-gray-50 rounded-3xl shadow-xl sm:m-7 sm:w-fit sm:p-8">
          <section className="w-full">
            <InputPassword
              label="Password"
              name="password"
              type="password"
              placeholder="Inserisci la tua password"
              error={errors?.password?.message}
            />
            <InputPassword
              label="Conferma Password"
              name="confirmPassword"
              type="password"
              placeholder="Riscrivi la tua password"
              error={errors?.confirmPassword?.message}
            />
          </section>
          <section className="w-full grid grid-cols-1 gap-7 place-items-center sm:grid-cols-2">
            <Button
              type="reset"
              text="Annulla"
              title="Annulla"
              textColor="text-black"
              backgroundColor="bg-gray-300 hover:bg-gray-200 hover:text-gray-100"
              iconName="reset"
              textSize="text-xs"
              onClick={handleReset}
            />
            <Button
              text="Conferma"
              title="Conferma"
              iconColor="white"
              backgroundColor="bg-yellow-200 hover:bg-yellow-50"
              iconName="rightArrow"
              onClick={handleClickAccess}
            />
          </section>
          <article className="w-full text-center grid grid-cols-1 gap-6 my-8">
            <A href={ROUTES.login} text="Ti sei ricordato della password?" />
          </article>
        </article>
      </section>
    </FormProvider>
  );
};

export default Form;
