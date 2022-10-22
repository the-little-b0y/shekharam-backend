import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { StatusCodes } from "http-status-codes";
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";

/**
 * Validate Request.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).json(getResponseCodeObject(ResponseCodes.RequestValidationFailed, false, undefined, errors.array()));
    } else {
        next()
    }
}
