import { AppError } from "./AppError";
import EStatusCode from '../@types/EStatusCode'

export class InvalidFormatError extends AppError {
  constructor(message: string, error?: string | object) {
    super(EStatusCode.INVALID_FORMAT, message)
  }
}