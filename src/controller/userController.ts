import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";
import { UserInterface } from "../contracts/userInterface";
import { User } from "../database/models/userModal";
import { checkDataExists } from "../utils/dbValidator";
import { encrypt } from "../utils/passwordHash";

/**
 * Post user data to the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postUser = (req: Request, res: Response) => {
    checkDataExists(User, { mobileNumber: req.body.mobileNumber }, async (err, exists) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(ResponseCodes.UserCreationFailed, false));
        } else if(exists) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(ResponseCodes.ExistingRegisteredMobileNumber, true));
        } else {
            const hash = await encrypt(req.body.password);
        
            const user = new User<UserInterface>({
                mobileNumber: req.body.mobileNumber,
                password: hash,
                status: 1,
                actionCount: 1,
                creation: new Date(),
                updation: new Date()
            });
        
            user.save((err, data) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(ResponseCodes.UserCreationFailed, false));
                } else {
                    res.status(StatusCodes.OK).json(getResponseCodeObject(ResponseCodes.UserCreationSuccess, true));
                }
            });
        }
    })

}
