import { RecipesTypes, User } from '../models';
import axios from 'axios';

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  passwordRecovery: '/password-recovery',
  passwordRecoveryConfirm: '/password-recovery/confirm',
  login: '/login',
  contacts: '/contacts',
  profile: '/profile',
  settings: '/settings',
  myRecipes: '/my-recipes',
  myRecipesForm: '/my-recipes/new',
  users: '/users:id',
};

export const RECIPES_TYPES: Array<RecipesTypes> = [
  {
    id: 1,
    value: 'Antipasto',
  },
  {
    id: 2,
    value: 'Primo',
  },
  {
    id: 3,
    value: 'Secondo',
  },
  {
    id: 4,
    value: 'Contorno',
  },
  {
    id: 5,
    value: 'Bevanda',
  },
  {
    id: 6,
    value: 'Dolce',
  },
  {
    id: 7,
    value: 'Vegano',
  },
  {
    id: 8,
    value: 'Speciale',
  },
];

export const handleLogout = async () => {
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
