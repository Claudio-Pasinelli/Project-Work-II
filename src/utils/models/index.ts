export interface User {
  email: string;
  username: string;
  password?: string;
  // passwordConfirm?: string;
  // firstName: string;
  // lastName: string;
  // phone?: string;
  // resourceId: number;
  // id?: number;
  // createdAt?: Date;
  // role?: string;
  // uid?: string;
  // updatedAt?: Date;
}

export interface Message {
  name: string;
  email: string;
  message: string;
}

export type IErrorFullContacts = {
  email: string | null;
  message: string | null;
};

export type IError = {
  name: string | null;
  email: string | null;
  message: string | null;
  termsOfService: string | null;
};

// export type ReturnContacts = TypedResponse<{
//   success: boolean;
//   errorsContacts?: IErrorFullContacts;
//   errors?: IError;
//   resendError?: ErrorResponse;
//   data?: unknown;
// }>;
