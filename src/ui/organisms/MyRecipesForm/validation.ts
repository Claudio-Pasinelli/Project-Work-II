import { z } from 'zod';

const schema = z.object({
  title: z.coerce.string()
  .min(1, { message: 'Nome troppo corto.' })
  .max(20, { message: 'Nome troppo lungo.' }),
  ingredients: z.coerce.string().min(1, { message: 'Gli ingredienti sono insufficienti.'}),
  process: z.coerce.string()
  .min(5, { message: 'Procedimento troppo corto.' }),
  type: z.coerce.string()
  .min(1, { message: 'Tipo di pasto obbligatorio.' })
});

export default schema;
