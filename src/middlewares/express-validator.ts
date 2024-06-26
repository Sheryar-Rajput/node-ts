// validationMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { HttpStatusCodes } from "../utils/http-status-code";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  };
};
