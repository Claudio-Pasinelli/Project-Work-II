export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  recuperoPassword: '/password-recovery',
  login: '/login',
  contacts: '/contacts',
  profile: '/profile',
  settings: '/settings',
  myRecipes: '/my-recipes',
  myRecipesForm: '/my-recipes/new',
  users: '/users:id',
};

export const RESEND_API_KEY = 're_YJf373dW_MpknFi27ddnCEKAM27iS4JNM';

export interface RecipesTypes {
  value: string;
  name: string;
}

export const RECIPES_TYPES: RecipesTypes[] = [
  {
    value: 'ANTIPASTI',
    name: 'Antipasti',
  },
  {
    value: 'PRIMI',
    name: 'Primi',
  },
  {
    value: 'SECONDI',
    name: 'Secondi',
  },
  {
    value: 'CONTORNI',
    name: 'Contorni',
  },
  {
    value: 'BEVANDE',
    name: 'Bevande',
  },
  {
    value: 'DOLCI',
    name: 'Dolci',
  },
  {
    value: 'VEGANI',
    name: 'Vegani',
  },
  {
    value: 'SPECIALI',
    name: 'Speciali',
  },
];
