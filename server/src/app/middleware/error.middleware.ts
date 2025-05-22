import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResourceNotFoundError, DuplicateKeyError } from '../features/personal-voice/services/personalVoice.service';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  console.error(`Error: ${error.message}`);
  
  // Handle known error types
  if (error instanceof ResourceNotFoundError) {
    res.status(404).json({
      error: error.name,
      message: error.message
    });
    return;
  }
  
  if (error instanceof DuplicateKeyError) {
    res.status(409).json({
      error: error.name,
      message: error.message
    });
    return;
  }
  
  // Handle unknown errors
  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred'
  });
}; 