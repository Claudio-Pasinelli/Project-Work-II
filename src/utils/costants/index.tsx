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

export const RESEND_API_KEY = 're_gRG23fRs_MUEnyJ7s2rwJ6V5pAWnU3pqH';

export interface RecipesTypes {
  value: string;
  id: number;
}

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
