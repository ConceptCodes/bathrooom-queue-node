import { ErrorCodes, Optional } from "@/constants";
import { StatusCodes } from "http-status-codes";

export class HttpException extends Error {
  status: number;
  message: string;
  code: string;
  constructor(status: number, message: string, code?: keyof typeof ErrorCodes) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code || ErrorCodes.INTERNAL_ERROR;
  }
}

export class InvalidLoginCredentials extends HttpException {
  constructor() {
    super(
      StatusCodes.BAD_REQUEST,
      "Invalid login credentials",
      "VALIDATION_ERROR"
    );
  }
}

export class InvalidToken extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, "Invalid token", "AUTH_ERROR");
  }
}

export class ExpiredToken extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, "Expired token", "AUTH_ERROR");
  }
}

export class InvalidRole extends HttpException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "Invalid role", "INVALID_ROLE");
  }
}

export class ValidationError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.BAD_REQUEST,
      message || "Validation error",
      "VALIDATION_ERROR"
    );
  }
}

export class InternalError extends HttpException {
  constructor() {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong",
      "INTERNAL_ERROR"
    );
  }
}

export class CreateEntityError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Create entity error",
      "CREATE_ENTITY_ERROR"
    );
  }
}

export class GetAllEntitiesError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Get all entity error",
      "GET_ALL_ENTITIES_ERROR"
    );
  }
}

export class GetEntityByIdError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Get entity by id error",
      "GET_ENTITY_BY_ID_ERROR"
    );
  }
}

export class UpdateEntityError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Update entity error",
      "UPDATE_ENTITY_ERROR"
    );
  }
}

export class DeleteEntityError extends HttpException {
  constructor(message: Optional<string>) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Delete entity error",
      "DELETE_ENTITY_ERROR"
    );
  }
}

export class EntityNotFoundError extends HttpException {
  constructor(message: Optional<string>) {
    super(StatusCodes.NOT_FOUND, message || "Entity not found", "NOT_FOUND");
  }
}
