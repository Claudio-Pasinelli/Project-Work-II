import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Loader } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { ROUTES, Recipe, User } from '../../../utils';
import { Avatar, Modal } from '../../molecules';
import { cn } from '../../../utils/helpers/tailwindMerge';

const MyRecipes = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleGetUserRecipes = async () => {
    try {
      const responseUser = await axios.get('http://localhost:4000/me');
      const user = responseUser.data[0];
      setUserData(user);

      const responseRecipes = await axios.get('http://localhost:4000/recipes', {
        params: { idUser: user.id },
      });
      setRecipesData(responseRecipes.data);
    } catch (error) {
      console.error('Errore nel recuperare i dati', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  };

  const handleIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleSelectRecipe = (recipe?: Recipe | null) => {
    setRecipe(recipe || null);
    setIsOpen(true);
  };

  const handleEdit = (id: any) => {
    navigate(`${ROUTES.myRecipesForm}/${id}`);
  };

  useEffect(() => {
    handleGetUserRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/recipes/${recipeId}`);
      setRecipesData(recipesData.filter((r) => r.id !== recipeId));
      setIsOpen(false);
    } catch (error) {
      console.error('Errore durante la cancellazione della ricetta', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <article className="w-full h-fit flex justify-center items-center m-0 p-8 sm:py-16 sm:px-11">
      <section className="w-full">
        <section className="w-full flex justify-between items-center mb-4 sm:mb-9">
          <h1 className="text-4xl flex-grow text-center">Le mie ricette</h1>
          <Button
            title="Crea una ricetta"
            textColor="text-black"
            text="Nuovo"
            iconName="new"
            className="!w-28 !h-9 border border-gray-200 shadow-xl"
            onClick={() => navigate(ROUTES.myRecipesForm)}
          />
        </section>
        {userData && (
          <section
            className={cn(
              'grid justify-items-center gap-x-24 gap-y-12 w-full',
              recipesData.length === 1
                ? 'grid-cols-1 sm:grid-cols-1'
                : recipesData.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : recipesData.length === 3
                    ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : recipesData.length >= 4
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                      : null,
            )}>
            {recipesData.length != 0 ? (
              recipesData.map((recipe, index) => (
                <article className="w-64 h-full break-words" key={recipe.name + index}>
                  <article className="w-full h-full min-h-[26.25rem] max-h-[26.25rem] flex flex-col text-left bg-gray-50 border border-gray-200 rounded-t-3xl rounded-bl-3xl shadow-xl overflow-hidden">
                    <article className="flex flex-col justify-between p-2 border-b border-gray-200 items-center bg-orange rounded-t-3xl shadow-xl ">
                      <section className="w-full flex place-content-between">
                        {userData ? <Avatar userData={userData} isMe={true} /> : null}
                        <section className="w-1/3 flex justify-between">
                          <Button
                            iconName="delete"
                            className="!w-8 !min-w-8 !p-0"
                            title={`Elimina ${recipe.name}`}
                            onClick={() => handleSelectRecipe(recipe)}
                          />
                          <Button
                            iconName="edit"
                            className="!w-8 !min-w-8 !p-0"
                            title={`Modifica ${recipe.name}`}
                            onClick={() => handleEdit(recipe.id)}
                          />
                        </section>
                      </section>
                      <h2 className="text-lg font-bold">{recipe.name}</h2>
                    </article>
                    <article className="size-full flex flex-col justify-around p-2 overflow-auto">
                      <section>
                        <p className="font-bold">Ingredienti:</p>
                        <p>{recipe.ingredients}</p>
                      </section>
                      <section>
                        <p className="font-bold">Procedimento:</p>
                        <p>{recipe.process}</p>
                      </section>
                    </article>
                  </article>
                </article>
              ))
            ) : (
              <p>Al momento non hai nessuna ricetta.</p>
            )}
            <Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
              <article>
                <section className="flex justify-end">
                  <Button
                    className="!w-auto !max-w-auto !min-auto !bg-white !p-0 !sm:w-auto !sm:max-w-auto !sm:min-auto"
                    iconName="close"
                    onClick={() => handleIsOpen(false)}
                  />
                </section>
                <p>
                  Sei sicuro di voler eliminare <b className="text-red">{recipe?.name}</b>?
                </p>
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
                    onClick={() => handleIsOpen(false)}
                  />
                  <Button
                    text="Conferma"
                    title="Conferma"
                    iconColor="white"
                    className="!w-auto"
                    backgroundColor="bg-yellow-100 hover:bg-yellow-50"
                    iconName="rightArrow"
                    onClick={() => recipe?.id && handleDeleteRecipe(recipe.id)}
                  />
                </section>
              </article>
            </Modal>
          </section>
        )}
      </section>
    </article>
  );
};

export default MyRecipes;
