import { Request, Response, NextFunction } from "express";
// import errorLogger from "./error.logger";
import { BaseError } from "../utils/exceptions";
import { HttpStatusCodes } from "../utils/http-status-code";

function returnError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    console.log(err);
  }
  return res
    .status((err as any).statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send((err as any).message || "Oops, something went wrong");
}

const handleResponse =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next))
      .then((d) => res.status(HttpStatusCodes.OK).json(d))
      .catch(next);
  };

export { handleResponse, returnError };
