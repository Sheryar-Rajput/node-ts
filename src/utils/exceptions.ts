import { HttpStatusCodes } from "./http-status-code";

const httpStatusCodes = HttpStatusCodes;
class BaseError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    public name: string,
    statusCode: number,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class BadRequestError extends BaseError {
  constructor(
    description: string = "Bad Request",
    name: string = "Bad Request",
    statusCode: number = httpStatusCodes.BAD_REQUEST,
    isOperational: boolean = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class NotFoundError extends BaseError {
  constructor(
    description: string = "Not Found",
    name: string = "Not Found",
    statusCode: number = httpStatusCodes.NOT_FOUND,
    isOperational: boolean = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  constructor(
    description: string = "Internal Server Error",
    name: string = "Internal Server Error",
    statusCode: number = httpStatusCodes.INTERNAL_SERVER_ERROR,
    isOperational: boolean = false
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class ForbiddenError extends BaseError {
  constructor(
    description: string = "Forbidden",
    name: string = "Forbidden",
    statusCode: number = httpStatusCodes.FORBIDDEN,
    isOperational: boolean = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class UnauthorizedError extends BaseError {
  constructor(
    description: string = "Unauthorized",
    name: string = "Unauthorized",
    statusCode: number = httpStatusCodes.UNAUTHORIZED,
    isOperational: boolean = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export {
  BaseError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ForbiddenError,
  UnauthorizedError,
};
