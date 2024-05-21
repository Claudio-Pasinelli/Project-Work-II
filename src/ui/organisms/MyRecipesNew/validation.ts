import { z } from 'zod';

const schema = z.object({
  name: z.coerce.string()
  .min(1, { message: 'Nome troppo corto.' })
  .max(25, { message: 'Nome troppo lungo.' }),
  ingredients: z.coerce.string()
  .max(75, { message: 'Hai messo troppi ingredienti.'}),
  process: z.coerce.string()
  .min(5, { message: 'Procedimento troppo corto.' })
  .max(300, { message: 'Procedimento troppo lungo.'}),
});

export default schema;
