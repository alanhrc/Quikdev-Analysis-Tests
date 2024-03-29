import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import { Completeuser, RelateduserModel, Completefile, RelatedfileModel, CompleteComment, RelatedCommentModel } from "./index"

export const PostModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  vizualizations: z.number().int().nullish(),
  unlikes: z.number().int().nullish(),
  likes: z.number().int().nullish(),
  userId: z.string(),
  fileId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class PostDto extends createZodDto(PostModel) {
}

export interface CompletePost extends z.infer<typeof PostModel> {
  user: Completeuser
  file: Completefile
  Comment: CompleteComment[]
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() => PostModel.extend({
  user: RelateduserModel,
  file: RelatedfileModel,
  Comment: RelatedCommentModel.array(),
}))
