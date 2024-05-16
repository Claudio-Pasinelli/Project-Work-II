import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '../../../atoms';
import schema from '../validation';
// import Cookies from 'js-cookie';
import { Message, ROUTES } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  name: '',
  email: '',
  message: '',
};

const Form = () => {
  const methods = useForm<Message>({
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

  const handleSendEmail = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      // console.log({errors.});

      return hasErrors;
    }

    handleReset();
    return navigate(ROUTES.home);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <section className="w-[33.75rem] h-full flex flex-col place-items-center rounded-3xl bg-yellow-100 sm:rounded-3xl">
        <h1 className="w-full h-fit font-FrienchFries bg-orange text-6xl text-center text-white content-center text-5xl rounded-t-3xl shadow-xl sm:rounded-3xl">
          SCRIVIMI UN MESSAGGIO
        </h1>
        <article className="w-3/4 flex flex-col my-5 p-4 items-center bg-gray-50 rounded-3xl shadow-xl sm:m-7 sm:w-fit sm:p-8">
          <section className="w-full">
            <Input
              label="Nome"
              labelColor="text-black"
              name="name"
              type="text"
              placeholder="Inserisci Il tuo nome"
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
            <Textarea
              label="Messaggio"
              labelColor="text-black"
              name="message"
              placeholder="Scrivi un messaggio"
              error={errors?.message?.message}
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
              name="_action"
              onClick={handleSendEmail}
            />
          </section>
        </article>
      </section>
    </FormProvider>
  );
};

export default Form;
