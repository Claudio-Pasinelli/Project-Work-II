import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DropdownFilter, Loader, SearchInput } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { RECIPES_TYPES, ROUTES, Recipe, User } from '../../../utils';
import { Avatar, Modal } from '../../molecules';
import { cn } from '../../../utils/helpers/tailwindMerge';

const MyRecipes = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [filteredRecipesData, setFilteredRecipesData] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleGetUserRecipes = async () => {
    try {
      const responseUser = await axios.get('http://localhost:4000/me');

      if (!responseUser.data[0]) {
        return navigate(ROUTES.home);
      }

      const user = responseUser.data[0];
      setUserData(user);

      const responseRecipes = await axios.get('http://localhost:4000/recipes', {
        params: { idUser: user.id },
      });
      setRecipesData(responseRecipes.data);
      setFilteredRecipesData(responseRecipes.data);
    } catch (err) {
      console.error(err);
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

  const handleDeleteRecipe = async (recipeId: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/recipes/${recipeId}`);
      const updatedRecipes = recipesData.filter((r) => r.id !== recipeId);
      setRecipesData(updatedRecipes);
      setFilteredRecipesData(updatedRecipes);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = recipesData.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(value) ||
        recipe.ingredients.toLowerCase().includes(value) ||
        recipe.process.toLowerCase().includes(value) ||
        recipe.type.toLowerCase().includes(value),
    );
    setFilteredRecipesData(filtered);
  };

  const handleFilterChange = (selectedType: string) => {
    if (selectedType === 'Tutte') {
      setFilteredRecipesData(recipesData);
    } else {
      const filtered = recipesData.filter((recipe) => recipe.type === selectedType);
      setFilteredRecipesData(filtered);
    }
  };

  useEffect(() => {
    handleGetUserRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <article className="size-full h-fit max-h-fit min-h-[42.662rem] flex justify-center items-baseline m-0 p-6 sm:py-12 sm:px-8">
      <section className="w-full flex flex-col-reverse items-center md:flex-row">
        <section className="w-full flex flex-col">
          <section className="w-full mb-4 flex flex-col items-center">
            <h1 className="text-4xl text-center mb-4 sm:mb-9">Le mie ricette</h1>
            <SearchInput
              name="search"
              onChange={handleChangeSearch}
              containerClassName="mx-4 mb-4"
            />
            <section className="w-full flex justify-evenly items-center mb-4 sm:flex-row sm:mb-9">
              <DropdownFilter
                name="filter"
                options={[{ id: 0, value: 'Tutte' }, ...RECIPES_TYPES]}
                onOptionChange={handleFilterChange}
              />
              <Button
                title="Crea una ricetta"
                textColor="text-black"
                text="Nuovo"
                iconName="new"
                className="!w-28 !h-9 border border-gray-200 shadow-xl"
                onClick={() => navigate(ROUTES.myRecipesForm)}
              />
            </section>
          </section>
          {userData && (
            <section
              className={cn(
                'grid gap-8 justify-items-center w-full',
                'justify-items-center gap-x-24 gap-y-12 w-full',
                filteredRecipesData.length === 1
                  ? 'grid-cols-1 sm:grid-cols-1'
                  : filteredRecipesData.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : filteredRecipesData.length === 3
                      ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      : filteredRecipesData.length >= 4
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        : null,
              )}>
              {filteredRecipesData.length != 0 ? (
                filteredRecipesData.map((recipe, index) => (
                  <article
                    className="max-w-64 min-w-52 h-full break-all transform transition duration-300 hover:-translate-y-1 sm:w-64 sm:break-words"
                    key={recipe.title + index}>
                    <article className="w-full h-full min-h-[26.25rem] max-h-[26.25rem] flex flex-col text-left bg-gray-50 border border-gray-200 rounded-t-3xl rounded-bl-3xl shadow-xl overflow-hidden">
                      <article
                        className={cn(
                          'flex flex-col justify-between p-2 border-b border-gray-200 items-center rounded-t-3xl shadow-xl',
                          recipe.bgColor,
                        )}>
                        <section className="w-full flex place-content-between">
                          {userData ? <Avatar userData={userData} isMe={true} /> : null}
                          <section className="w-1/3 flex justify-between">
                            <Button
                              iconName="delete"
                              className="!w-8 !min-w-8 !p-0 shadow-xl"
                              title={`Elimina ${recipe.title}`}
                              onClick={() => handleSelectRecipe(recipe)}
                            />
                            <Button
                              iconName="edit"
                              className="!w-8 !min-w-8 !p-0 shadow-xl"
                              title={`Modifica ${recipe.title}`}
                              onClick={() => handleEdit(recipe.id)}
                            />
                          </section>
                        </section>
                        <article className="w-full m-1 text-center break-keep">
                          <h2 className="font-bold break-words">
                            <b>{recipe.title}</b>
                          </h2>
                          <p>Tipo: {recipe.type}</p>
                        </article>
                      </article>
                      <article className="size-full flex flex-col justify-around p-2 overflow-auto">
                        <section className="m-1 break-keep">
                          <p className={cn('font-bold', recipe.sectionsColor)}>
                            <b>Ingredienti:</b>
                          </p>
                          <p>{recipe.ingredients}</p>
                        </section>
                        <section className="m-1 break-keep">
                          <p className={cn('font-bold', recipe.sectionsColor)}>
                            <b>Procedimento:</b>
                          </p>
                          <p>{recipe.process}</p>
                        </section>
                      </article>
                    </article>
                  </article>
                ))
              ) : (recipesData.length != 0 || !recipesData) && filteredRecipesData.length === 0 ? (
                <p>Nessuna ricetta è stata trovata.</p>
              ) : (
                <p>Al momento non hai nessuna ricetta.</p>
              )}

              <Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
                <article>
                  <section className="flex justify-end">
                    <Button
                      className="justify-content-end m-2 !p-0 !bg-white !min-w-fit !w-fit !max-w-fit !min-h-fit !h-fit !max-h-fit"
                      iconName="close"
                      onClick={() => handleIsOpen(false)}
                    />
                  </section>
                  <p>
                    Sei sicuro di voler eliminare <b className="text-red-100">{recipe?.title}</b>?
                  </p>
                  <section className="size-full p-2.5 grid grid-cols-1 gap-7 place-items-center sm:grid-cols-2">
                    <Button
                      type="reset"
                      text="Annulla"
                      title="Annulla"
                      textColor="text-black"
                      className="!w-full !sm:w-auto"
                      backgroundColor="bg-gray-300 hover:bg-gray-200 hover:text-gray-100"
                      iconName="reset"
                      textSize="text-xs"
                      onClick={() => handleIsOpen(false)}
                    />
                    <Button
                      text="Conferma"
                      title="Conferma"
                      iconColor="white"
                      className="!w-full !sm:w-auto"
                      backgroundColor="bg-yellow-200 hover:bg-yellow-50"
                      iconName="rightArrow"
                      onClick={() => recipe?.id && handleDeleteRecipe(recipe.id)}
                    />
                  </section>
                </article>
              </Modal>
            </section>
          )}
        </section>
      </section>
    </article>
  );
};

export default MyRecipes;
