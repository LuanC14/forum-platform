import { UseCaseError } from "./base/UseCaseError";

export class ResourceNotFoundError extends Error implements UseCaseError{
    constructor() {
      super('Resource not found')
    }
  }