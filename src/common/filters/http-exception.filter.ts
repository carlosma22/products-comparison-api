import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro global de excepciones HTTP
 * Captura todas las excepciones HTTP y las formatea de manera consistente
 * Proporciona respuestas JSON estructuradas con información detallada del error
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Estructura base de la respuesta de error
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: this.extractMessage(exceptionResponse),
      error: this.extractError(exceptionResponse, status),
    };

    // Agregar información adicional si está disponible
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const additionalInfo = { ...exceptionResponse };
      delete additionalInfo['statusCode'];
      delete additionalInfo['message'];
      delete additionalInfo['error'];

      if (Object.keys(additionalInfo).length > 0) {
        Object.assign(errorResponse, additionalInfo);
      }
    }

    // Log del error para debugging
    console.error(
      `🔴 [${errorResponse.method}] ${errorResponse.path} - Status: ${status} - ${errorResponse.message}`,
    );

    response.status(status).json(errorResponse);
  }

  /**
   * Extrae el mensaje de error de la respuesta de la excepción
   */
  private extractMessage(exceptionResponse: string | object): string | string[] {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      return exceptionResponse.message as string | string[];
    }

    return 'Internal server error';
  }

  /**
   * Extrae el tipo de error de la respuesta de la excepción
   */
  private extractError(exceptionResponse: string | object, status: number): string {
    if (typeof exceptionResponse === 'object' && 'error' in exceptionResponse) {
      return exceptionResponse.error as string;
    }

    // Mapeo de códigos de estado HTTP a nombres de error
    const errorNames: { [key: number]: string } = {
      [HttpStatus.BAD_REQUEST]: 'Bad Request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Not Found',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    };

    return errorNames[status] || 'Error';
  }
}
