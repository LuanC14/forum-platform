import { Question } from "src/domain/forum/enterprise/entities/Question";

export default interface GetQuestionBySlugResponse {
    question: Question;
}