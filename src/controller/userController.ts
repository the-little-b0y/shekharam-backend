import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";

/**
 * Post user data to the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postUser = async (req: Request, res: Response) => {
    console.log('Router Test')
    res.status(StatusCodes.OK).json(getResponseCodeObject(ResponseCodes.UserCreated, true));
}
