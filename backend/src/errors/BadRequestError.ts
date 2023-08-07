import { AppError } from "./AppError";
import EStatusCode from '../@types/EStatusCode'

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(EStatusCode.BAD_REQUEST, message)
  }
}