import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Loader } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { ROUTES, Recipe, User } from '../../../utils';
import { Avatar } from '../../molecules';

const MyRecipes = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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
      }, 500);
    }
  };

  useEffect(() => {
    handleGetUserRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <article className="w-full h-fit flex justify-center items-center m-0 p-8 sm:py-16 sm:px-11">
      <section>
        <h1 className="text-4xl">Le mie ricette</h1>
        <Button
          title="Crea una ricetta"
          textColor="text-black"
          text="Nuovo"
          iconName="new"
          className="!w-28 !h-9 border border-gray-200 shadow-xl"
          onClick={() => navigate(ROUTES.myRecipesNew)}
        />
        {userData && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
            {recipesData.map((recipe, index) => (
              <article className="w-full" key={recipe.name + index}>
                <article className="w-full min-h-full h-[26.25rem] max-h-[26.25rem] flex flex-col text-left bg-gray-50 border border-gray-200 rounded-3xl shadow-xl">
                  <article className="flex flex-col justify-between p-2 border-b border-gray-200 items-center bg-orange rounded-t-3xl shadow-xl ">
                    <section className="w-full">
                      {userData ? <Avatar userData={userData} isMe={true} /> : null}
                    </section>
                    <h2 className="text-lg font-bold">{recipe.name}</h2>
                  </article>
                  <article className="size-full flex flex-col justify-around p-2">
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
            ))}
          </section>
        )}
      </section>
    </article>
  );
};

export default MyRecipes;
