import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, A, InputPassword } from '../../../atoms';
import schema from '../validation';
import Cookies from 'js-cookie';
import { ROUTES, User } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const defaultValues = {
  email: '',
  name: '',
  password: '',
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
    setValue,
    getValues,
    setError,
  } = methods;

  const navigate = useNavigate();

  const handleClickAccess = async () => {
    const hasErrors = await trigger();

    Cookies.set('email', getValues('email'));

    if (!hasErrors) {
      // console.log({errors.});

      return hasErrors;
    }

    // !checked ? Cookies.remove(EMAIL) : Cookies.set(EMAIL, getValues(`${EMAIL}`));

    // const response = await dispatch(loginUser(getValues()));

    // if (response.payload === null) {
    //   setError('email', { message: 'Email non valida' });
    //   setError('password', { message: 'Password non valida' });
    //   return null;
    // }

    handleReset();
    return navigate(ROUTES.home);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    handleReset();
    Cookies.get('email') && setValue('email', Cookies.get('email') as string);
  }, []);

  return (
    <FormProvider {...methods}>
      <section className="w-[33.75rem] h-full flex flex-col place-items-center rounded-3xl bg-yellow-100 sm:rounded-r-3xl sm:rounded-bl-none">
        <h1 className="w-full h-20 bg-orange text-4xl text-center text-white content-center text-5xl rounded-t-3xl shadow-xl sm:rounded-tr-3xl sm:rounded-tl-none">
          REGISTRATI
        </h1>
        <article className="w-3/4 flex flex-col my-5 p-4 items-center bg-gray-50 rounded-3xl shadow-xl sm:m-7 sm:w-fit sm:p-8">
          <section className="w-full">
            <Input
              label="Nome"
              name="name"
              type="nome"
              placeholder="Inserisci il tuo nome"
              error={errors?.name?.message}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Inserisci la tua email"
              error={errors?.email?.message}
            />
            <InputPassword
              label="Password"
              name="password"
              type="password"
              placeholder="Inserisci la tua password"
              error={errors?.password?.message}
            />
          </section>
          <section className="w-full grid grid-cols-1 gap-7 place-items-center sm:grid-cols-2">
            <Button
              type="reset"
              title="Annulla"
              textColor="text-black"
              backgroundColor="bg-gray-300 hover:bg-gray-200 hover:text-gray-100"
              iconName="reset"
              titleSize="text-xs"
            />
            <Button
              title="Conferma"
              backgroundColor="bg-yellow-100 hover:bg-yellow-50"
              iconName="rightArrow"
              onClick={handleClickAccess}
            />
          </section>
          <article className="w-full text-center my-8">
            <A href="/login" text="Hai già un account?" />
          </article>
        </article>
      </section>
    </FormProvider>
  );
};

export default Form;
