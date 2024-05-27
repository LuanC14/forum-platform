import CreateAnswerRequest from "./contracts/CreateAnswerRequest";
import FindAnswerByIdRequest from "./contracts/FindAnswerByIdRequest";
import FindAnswerByIdResponse from "./contracts/FindAnswerByIdResponse";
import EditAnswerRequest from "./contracts/EditAnswerRequest";
import EditAnswerResponse from "./contracts/EditAnswerResponse";
import DeleteAnswerRequest from "./contracts/DeleteAnswerRequest";
import DeleteAnswerResponse from "./contracts/DeleteAnswerResponse";

import { EntityID } from "src/core/entities/EntityID"
import { Answer } from "src/domain/forum/enterprise/entities/Answer";
import { IAnswerRepository } from "src/domain/forum/repositories/interfaces/IAnswerRepository";

export class AnswerService {

    constructor(private answersRepository: IAnswerRepository) { }

    public async createAnswer({ instructorId, questionId, content }: CreateAnswerRequest ): Promise<Answer> {
        const answer = new Answer({
            content,
            authorId: new EntityID(instructorId),
            questionId: new EntityID(questionId),
            createdAt: new Date()
        })
        return await this.answersRepository.create(answer);
    }

    async findById({ answerId }: FindAnswerByIdRequest): Promise<FindAnswerByIdResponse> {
        const answer = await this.answersRepository.findById(answerId)
        if (!answer) throw new Error("Answer not found")
        return { answer }
    }

    async updateResponse({ authorId, answerId, content, }: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString) {
            throw new Error('Not allowed.')
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return { answer }
    }

    async deleteAnswer({ answerId, authorId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString) {
            throw new Error('Not allowed.')
        }

        await this.answersRepository.delete(answer)

        return {}
    }
}