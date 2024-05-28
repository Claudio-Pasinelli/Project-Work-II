import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DropdownFilter, Loader, SearchInput } from '../../atoms';
import { RECIPES_TYPES, Recipe, User } from '../../../utils';
import { Avatar } from '../../molecules';
import { cn } from '../../../utils/helpers/tailwindMerge';

const OtherUser = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [filteredRecipesData, setFilteredRecipesData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();

  const handleGetUserDataAndRecipes = async (id: string) => {
    try {
      const responseUser = await axios.get(`http://localhost:4000/users/${id}`);
      const user = responseUser.data;
      setUserData(user);

      const responseRecipes = await axios.get(`http://localhost:4000/recipes?idUser=${id}`);
      const recipes = responseRecipes.data;
      setRecipesData(recipes);
      setFilteredRecipesData(recipes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    if (userId) {
      handleGetUserDataAndRecipes(userId);
    }
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <article className="w-full h-fit max-h-fit min-h-[42.662rem] flex justify-center items-baseline m-0 p-8 sm:py-16 sm:px-11">
      <section className="w-full flex">
        <section className="w-full">
          <section className="w-full flex justify-end">
            <SearchInput name="search" onChange={handleChangeSearch} />
          </section>
          <h1 className="text-4xl text-center mb-4 sm:mb-9">Le ricette di {userData?.name}</h1>
          {userData && (
            <section
              className={cn(
                'grid justify-items-center gap-x-24 gap-y-12 w-full',
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
              {filteredRecipesData.length !== 0 ? (
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
                          <Avatar userData={userData} isMe={false} />
                        </section>
                        <article className="w-full m-1 text-center break-keep">
                          <h2 className="font-bold break-words">
                            <b>{recipe.title}</b>
                          </h2>
                          <p>Tipo: {recipe.type}</p>
                        </article>
                      </article>
                      <article className="size-full flex flex-col justify-around p-2 overflow-auto">
                        <section className="m-1">
                          <p className={cn('font-bold', recipe.sectionsColor)}>Ingredienti:</p>
                          <p>{recipe.ingredients}</p>
                        </section>
                        <section className="m-1">
                          <p className={cn('font-bold', recipe.sectionsColor)}>Procedimento:</p>
                          <p>{recipe.process}</p>
                        </section>
                      </article>
                    </article>
                  </article>
                ))
              ) : (
                <p>Nessuna ricetta è stata trovata.</p>
              )}
            </section>
          )}
        </section>
        <DropdownFilter
          name="filter"
          options={[{ id: 0, value: 'Tutte' }, ...RECIPES_TYPES]}
          onOptionChange={handleFilterChange}
        />
      </section>
    </article>
  );
};

export default OtherUser;
