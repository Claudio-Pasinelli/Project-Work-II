import { z } from 'zod';

const schema = z.object({
  email: z.coerce.string().email().min(5, { message: 'Email non valida' }),
  message: z.coerce.string().min(5, { message: 'Messaggio troppo corto' }),
});

export default schema;
