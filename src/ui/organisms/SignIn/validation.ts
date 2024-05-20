import { z } from 'zod';

const schema = z.object({
  email: z.coerce.string().email().min(5, { message: 'Email non valida.' }),
  name:  z
  .string()
  .min(3, { message: 'Nome troppo corto.' })
  .max(20, { message: 'Nome troppo lungo.' }),
  password: z
    .string()
    .min(5, { message: 'Password troppo corta.' })
    .max(15, { message: 'Password troppo lunga.' }),
});

export default schema;
