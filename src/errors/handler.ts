import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.json({
      status: 'error',
      message: 'Erro de validação.',
      errors,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
  });
}

export default errorHandler;
