import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputPassword } from '../../../atoms';
import schema from '../validation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../../../utils';

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
  } = methods;

  const [userData, setUserData] = useState<User | null>(null);

  const handleUpdateProfile = async () => {
    try {
      const hasErrors = await trigger();

      if (!hasErrors) {
        return;
      }

      if (!userData) {
        console.error('Utente non trovato.');
        return;
      }

      const updatedUserData = getValues();
      await axios.patch(`http://localhost:4000/me/${userData.id}`, updatedUserData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get('http://localhost:4000/me');
        const meData = res.data[0];
        if (meData) {
          setUserData(meData);
          reset(meData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <section className="w-[33.75rem] h-full flex flex-col place-items-center rounded-3xl bg-yellow-100 sm:rounded-3xl">
        <h1 className="w-full h-fit bg-orange text-4xl text-center text-white content-center rounded-t-3xl shadow-xl sm:rounded-t-3xl">
          IMPOSTAZIONI PROFILO
        </h1>
        <article className="w-3/4 flex flex-col my-5 p-4 text-left bg-gray-50 rounded-3xl shadow-xl sm:m-7 sm:w-fit sm:p-8">
          <section className="w-full">
            <Input
              label="Nome"
              labelColor="text-black"
              name="name"
              type="text"
              placeholder="Inserisci il tuo nome"
              error={errors?.name?.message}
            />
            <Input
              label="Email"
              labelColor="text-black"
              name="email"
              type="email"
              placeholder="Inserisci la tua email"
              error={errors?.email?.message}
            />
            <InputPassword
              label="Password"
              labelColor="text-black"
              name="password"
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
              className="flex-1"
              onClick={handleReset}
            />
            <Button
              text="Conferma"
              title="Conferma"
              iconColor="white"
              backgroundColor="bg-yellow-100 hover:bg-yellow-50"
              iconName="rightArrow"
              onClick={handleUpdateProfile}
            />
          </section>
        </article>
      </section>
    </FormProvider>
  );
};

export default Form;
