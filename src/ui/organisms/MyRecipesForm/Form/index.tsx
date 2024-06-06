/* eslint-disable quotes */
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dropdown, Input, Textarea } from '../../../atoms';
import schema from '../validation';
import { Recipe, RECIPES_TYPES, ROUTES, User } from '../../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from '../../../molecules';
import { cn } from '../../../../utils/helpers/tailwindMerge';

const defaultValues = {
  title: '',
  ingredients: '',
  process: '',
  type: '',
  bgColor: '',
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
    setValue,
  } = methods;

  const [userData, setUserData] = useState<User | null>(null);
  const [bgColor, setBgColor] = useState<string>('');
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    const type = getValues('type');

    const newRecipe = {
      idUser: userData?.id,
      title: getValues('title'),
      ingredients: getValues('ingredients'),
      process: getValues('process'),
      type: type,
      bgColor:
        type === 'Antipasto'
          ? 'bg-orange-50'
          : type === 'Primo'
            ? 'bg-lightblue-50'
            : type === 'Secondo'
              ? 'bg-pink-50'
              : type === 'Contorno'
                ? 'bg-amber-50'
                : type === 'Bevanda'
                  ? 'bg-indigo-50'
                  : type === 'Dolce'
                    ? 'bg-yellow-200'
                    : type === 'Vegano'
                      ? 'bg-green-50'
                      : type === 'Speciale'
                        ? 'bg-red-100'
                        : '',
      sectionsColor:
        type === 'Antipasto'
          ? 'text-orange-100'
          : type === 'Primo'
            ? 'text-lightblue-100'
            : type === 'Secondo'
              ? 'text-pink-100'
              : type === 'Contorno'
                ? 'text-amber-100'
                : type === 'Bevanda'
                  ? 'text-indigo-100'
                  : type === 'Dolce'
                    ? 'text-yellow-300'
                    : type === 'Vegano'
                      ? 'text-green-100'
                      : type === 'Speciale'
                        ? 'text-red-200'
                        : '',
    };

    if (params.id) {
      try {
        await axios.put(`http://localhost:4000/recipes/${params.id}`, newRecipe);
        navigate(ROUTES.myRecipes);
      } catch (error) {
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
      const meData = res.data[0];
      if (meData) {
        setUserData(meData);
        return reset(meData);
      }
      return navigate(ROUTES.home);
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
        setBgColor(recipeData.bgColor);
        setValue('type', recipeData.type);
      });
    }
  }, [params.id]);

  return (
    <FormProvider {...methods}>
      <article className="flex flex-col">
        <h1 className="w-full h-fit mb-4 text-4xl text-center content-center sm:mb-9">
          {params.id ? 'MODIFICA LA TUA RICETTA' : 'CREA LA TUA RICETTA'}
        </h1>
        <section className="w-full flex">
          <article className="w-64 max-h-[37.5rem] flex flex-col self-center text-left bg-gray-50 border border-gray-200 rounded-3xl shadow-xl">
            <article
              className={cn(
                'p-2.5 text-center content-center border-b border-gray-200 rounded-t-3xl shadow-xl sm:rounded-t-3xl',
                bgColor ? bgColor : 'bg-gray-200',
              )}>
              {userData ? <Avatar userData={userData} isMe={true} /> : null}
              <Input
                label="Nome Ricetta:"
                labelColor="text-white"
                name="title"
                type="text"
                placeholder="Inserisci il nome della ricetta"
                error={errors?.title?.message}
              />
            </article>
            <section className="flex-grow p-2.5 overflow-auto">
              <Textarea
                label="Lista ingredienti:"
                labelColor="text-black"
                name="ingredients"
                placeholder="Inserisci gli ingredienti"
                error={errors?.ingredients?.message}
              />
              <Textarea
                label="Scrivi il procedimento:"
                labelColor="text-black"
                name="process"
                placeholder="Scrivi il procedimento di preparazione"
                error={errors?.process?.message}
              />
            </section>
            <section className="w-full flex justify-around p-2.5 place-items-center mt-4">
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
                backgroundColor="bg-yellow-200 hover:bg-yellow-50"
                iconName="rightArrow"
                onClick={handleFormSubmit}
              />
            </section>
          </article>
          <Dropdown
            label="Scegli il tipo di ricetta"
            options={RECIPES_TYPES}
            name="type"
            error={errors?.type?.message}
          />
        </section>
      </article>
    </FormProvider>
  );
};

export default Form;
