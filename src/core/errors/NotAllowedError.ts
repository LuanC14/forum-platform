import { UseCaseError } from "./base/UseCaseError";

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
      super('Not allowed')
    }
  }