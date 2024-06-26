import { Question } from '../../enterprise/entities/Question'

export interface IQuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  delete(question: Question): Promise<void>
}