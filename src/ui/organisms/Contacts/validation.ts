import { z } from 'zod';

const schema = z.object({
  name: z.coerce.string()
  .min(5, { message: 'Nome troppo corto.' })
  .max(20, { message: 'Nome troppo lungo.' }),
  email: z.coerce.string().email().min(5, { message: 'Email non valida.' }),
  message: z.coerce.string().min(5, { message: 'Messaggio troppo corto.' }),
});

export default schema;
