export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  recipes: Recipe[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  name: string;
  email: string;
  message: string;
}
export interface Recipe {
  id?: number;
  idUser: string;
  title: string;
  ingredients: string;
  process: string;
  bgColor?: string;
  sectionsColor?: string;
  type: string;
}