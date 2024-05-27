import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { DropdownFilter, Loader, SearchInput } from '../../atoms';
import { RECIPES_TYPES, Recipe, User } from '../../../utils';
import { Avatar } from '../../molecules';
import { cn } from '../../../utils/helpers/tailwindMerge';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredRecipesData, setFilteredRecipesData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [meUser, setMeUser] = useState<User | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  const handleGetMeUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/me');
      setMeUser(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserRecipes = async () => {
    try {
      const responseUsers = await axios.get('http://localhost:4000/users');
      const allUsers: User[] = responseUsers.data;
      setUsers(allUsers);

      await handleGetMeUser();

      const allRecipesPromises = allUsers.map(async (user) => {
        const responseRecipes = await axios.get(`http://localhost:4000/recipes?idUser=${user.id}`);
        return responseRecipes.data;
      });

      const allRecipesResponses = await Promise.all(allRecipesPromises);
      const allRecipes = allRecipesResponses.flatMap((recipes: Recipe[]) => recipes);
      setRecipesData(allRecipes);

      setFilteredRecipesData(allRecipes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (selectedType: string) => {
    let filteredData = [...recipesData];
    if (selectedType !== 'Tutte') {
      filteredData = filteredData.filter((recipe) => recipe.type === selectedType);
    }
    setFilteredRecipesData(filteredData);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    handleGetUserRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipesData.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.toLowerCase().includes(searchTerm) ||
        recipe.process.toLowerCase().includes(searchTerm) ||
        recipe.type.toLowerCase().includes(searchTerm),
    );
    setFilteredRecipesData(filtered);
  }, [searchTerm, recipesData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <article className="w-full h-fit flex justify-center items-center m-0 p-8 sm:py-16 sm:px-11">
      <section className="w-full flex">
        <section className="w-full">
          <section className="w-full flex justify-end">
            <SearchInput name="search" onChange={handleChangeSearch} />
          </section>
          <h1 className="text-4xl text-center mb-4 sm:mb-9">Consigliati del giorno</h1>
          {users.length > 0 && (
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
                filteredRecipesData.map((recipe, index) => {
                  const userForRecipe = users.find((user) => user.id === recipe.idUser);
                  return (
                    <article
                      className="max-w-64 min-w-52 h-full break-all transform transition duration-300 hover:scale-[1.01] hover:-translate-y-1 sm:w-64 sm:break-words"
                      key={recipe.title + index}>
                      <article className="w-full h-full min-h-[26.25rem] max-h-[26.25rem] flex flex-col text-left bg-gray-50 border border-gray-200 rounded-t-3xl rounded-bl-3xl shadow-xl overflow-hidden">
                        <article
                          className={cn(
                            'flex flex-col justify-between p-2 border-b border-gray-200 items-center rounded-t-3xl shadow-xl',
                            recipe.bgColor,
                          )}>
                          <section className="w-full flex place-content-between">
                            {userForRecipe ? (
                              <Avatar
                                userData={userForRecipe}
                                isMe={meUser && userForRecipe.id === meUser.id}
                              />
                            ) : null}
                          </section>
                          <article className="text-center break-all sm:break-words">
                            <h2 className="text-lg font-bold">{recipe.title}</h2>
                            <p>Tipo: {recipe.type}</p>
                          </article>
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
                  );
                })
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

export default Home;
