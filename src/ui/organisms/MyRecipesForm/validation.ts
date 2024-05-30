import { z } from 'zod';

const schema = z.object({
  title: z.coerce.string()
  .min(1, { message: 'Campo obbligatorio.' })
  .max(35, { message: 'Nome troppo lungo.' }),
  ingredients: z.coerce.string().min(1, { message: 'Campo obbligatorio.'}),
  process: z.coerce.string()
  .min(1, { message: 'Campo obbligatorio.' }),
  type: z.coerce.string()
  .min(1, { message: 'Tipo di pasto obbligatorio.' })
});

export default schema;
