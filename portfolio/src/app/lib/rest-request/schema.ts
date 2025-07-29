import { z } from 'zod';

const TopicSchema = z.object({
  fields: z.array(
    z.object({
      id: z.string(),
      items: z
        .object({
          validations: z.array(
            z.object({
              'in': z.array(z.string())
            })
          )
        })
        .optional()
    })
  )
});

export { TopicSchema };
