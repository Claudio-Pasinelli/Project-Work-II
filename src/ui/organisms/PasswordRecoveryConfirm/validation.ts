import { z } from 'zod';

const schema = z.object({
  password: z
    .string()
    .min(5, { message: 'Password troppo corta.' })
    .max(15, { message: 'Password troppo lunga.' }),
  confirmPassword: z
    .string()
    .min(5, { message: 'Password troppo corta.' })
    .max(15, { message: 'Password troppo lunga.' }),
});

export default schema;
