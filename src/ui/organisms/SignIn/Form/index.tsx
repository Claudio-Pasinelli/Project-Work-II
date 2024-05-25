import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, A, InputPassword } from '../../../atoms';
import schema from '../validation';
import { ROUTES, User } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const defaultValues = {
  name: '',
  email: '',
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
    getValues,
    setError,
  } = methods;

  const navigate = useNavigate();

  const handleClickAccess = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    try {
      const res = await axios.get('http://localhost:4000/users');
      const users: User[] = res.data;

      const userExists = users.some((user) => user.email === getValues('email'));

      if (!userExists) {
        const newUser = {
          name: getValues('name'),
          email: getValues('email'),
          password: getValues('password'),
        };

        const createdUserRes = await axios.post('http://localhost:4000/users', newUser);
        const createdUserId = createdUserRes.data.id;

        await axios.post('http://localhost:4000/me', {
          id: createdUserId,
          ...newUser,
        });

        handleReset();
        return navigate(ROUTES.home);
      } else {
        // eslint-disable-next-line quotes
        setError('email', { message: "L'email esiste già." });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:4000/me');
      const meDataArray: User[] = res.data;

      if (meDataArray.length > 0) {
        for (const meData of meDataArray) {
          await axios.delete(`http://localhost:4000/me/${meData.id}`);
        }
        console.log('Tutti gli elementi in "me" sono stati eliminati');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleReset();
    handleLogout();
  }, []);

  return (
    <FormProvider {...methods}>
      <section className="w-[33.75rem] h-full flex flex-col place-items-center rounded-3xl bg-yellow-200 sm:rounded-r-3xl sm:rounded-bl-none">
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
          <article className="w-full text-center my-8">
            <A href="/login" text="Hai già un account?" />
          </article>
        </article>
      </section>
    </FormProvider>
  );
};

export default Form;
