import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '../../../atoms';
import schema from '../validation';
import { Recipe, ROUTES, User } from '../../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from '../../../molecules';

const defaultValues = {
  name: '',
  ingredients: '',
  process: '',
};

const Form = () => {
  const params = useParams();
  const methods = useForm<Recipe>({
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
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    const newRecipe = {
      idUser: userData?.id,
      name: getValues('name'),
      ingredients: getValues('ingredients'),
      process: getValues('process'),
    };

    if (params.id) {
      try {
        await axios.put(`http://localhost:4000/recipes/${params.id}`, newRecipe);
        navigate(ROUTES.myRecipes);
      } catch (error) {
        // eslint-disable-next-line quotes
        console.error("Errore durante l'aggiornamento della ricetta", error);
      }
    } else {
      try {
        await axios.post('http://localhost:4000/recipes', newRecipe);
        navigate(ROUTES.myRecipes);
      } catch (error) {
        console.error('Errore durante la creazione della ricetta', error);
      }
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const fetchMe = async () => {
    try {
      const res = await axios.get('http://localhost:4000/me');
      setUserData(res.data[0]);
    } catch (error) {
      console.error('Errore nel recuperare i dati utente', error);
    }
  };

  useEffect(() => {
    fetchMe();
    if (params.id) {
      axios.get(`http://localhost:4000/recipes/${params.id}`).then((response) => {
        const recipeData = response.data;
        reset(recipeData);
      });
    }
  }, [params.id]);

  return (
    <FormProvider {...methods}>
      <article className="flex flex-col">
        <h1 className="w-full h-fit mb-4 text-4xl text-center content-center sm:mb-9">
          {params.id ? 'MODIFICA LA TUA RICETTA' : 'CREA LA TUA RICETTA'}
        </h1>
        <article className="w-64 h-full max-h-[37.5rem] flex flex-col self-center text-left bg-gray-50 border border-gray-200 rounded-3xl shadow-xl">
          <article className="p-2.5 bg-orange text-center content-center border-b border-gray-200 rounded-t-3xl shadow-xl sm:rounded-t-3xl">
            {userData ? <Avatar userData={userData} isMe={true} /> : null}
            <Input
              label="Nome Ricetta"
              labelColor="text-white"
              name="name"
              type="text"
              placeholder="Inserisci il nome della ricetta"
              error={errors?.name?.message}
            />
          </article>
          <section className="size-full p-2.5">
            <Input
              label="Lista ingredienti"
              labelColor="text-black"
              name="ingredients"
              type="text"
              placeholder="Inserisci gli ingredienti"
              error={errors?.ingredients?.message}
            />
            <Textarea
              label="Scrivi i procedimenti"
              labelColor="text-black"
              name="process"
              placeholder="Scrivi il procedimento di preparazione"
              error={errors?.process?.message}
            />
            <section className="w-full flex justify-around p-2.5 place-items-center">
              <Button
                type="reset"
                text="Annulla"
                title="Annulla"
                textColor="text-black"
                className="!w-auto"
                backgroundColor="bg-gray-300 hover:bg-gray-200 hover:text-gray-100"
                iconName="reset"
                textSize="text-xs"
                onClick={handleReset}
              />
              <Button
                text="Conferma"
                title="Conferma"
                iconColor="white"
                className="!w-auto"
                backgroundColor="bg-yellow-100 hover:bg-yellow-50"
                iconName="rightArrow"
                onClick={handleFormSubmit}
              />
            </section>
          </section>
        </article>
      </article>
    </FormProvider>
  );
};

export default Form;
