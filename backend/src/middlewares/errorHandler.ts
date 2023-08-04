import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import EStatusCode from '../@types/EStatusCode';

export async function errorHandler(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error instanceof AppError) {
	 console.log(error.message)
	 next(error)
	}
	return res
		.status(EStatusCode.INTERNAL_SERVER_ERROR)
		.json('Something wen wrong. Please try again');
}
