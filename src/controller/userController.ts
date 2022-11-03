import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";
import { UserInterface } from "../contracts/userInterface";
import { User } from "../database/models/userModal";
import { checkDataExists } from "../utils/dbValidator";
import { decrypt, encrypt } from "../utils/passwordHash";
import { Types } from "mongoose";

/**
 * Post user data to the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postUser = (req: Request, res: Response) => {
    checkDataExists(User, { mobileNumber: req.body.mobileNumber }, async (err, exists) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.UserCreationFailed, false));
        } else if(exists) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.ExistingRegisteredMobileNumber, false));
        } else {
            const hash = await encrypt(req.body.password);
        
            const user = new User<UserInterface>({
                mobileNumber: req.body.mobileNumber,
                password: hash,
                firstName: '',
                lastName: '',
                status: 1,
                actionCount: 1,
                creation: new Date(),
                updation: new Date()
            });
        
            user.save((err, data) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.UserCreationFailed, false));
                } else {
                    res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.UserCreationSuccess, true));
                }
            });
        }
    })
}

/**
 * Get user - self data.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getUser = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    User.aggregate([
        { '$match': { '_id': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.UserFetchFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.UserFetchSuccess, true, data[0]));
        }
    })
}

/**
 * Update user data.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putUser = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = req.user._id
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth
    }
    
    const updateQuery = {
        $set: {...data, ...{
            updation: new Date()
        }},
        $inc: {'actionCount' :1}
    }

    User.findOneAndUpdate({$and:[{status: 1}, {_id: userid}]}, updateQuery, (err: any, data: any) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.UserUpdateFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.UserUpdateSuccess, true));
        }
    })
}

/**
 * Update user avatar and greeting.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putAvatar = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = req.user._id
    const data = {
        avatar: req.body.avatar,
        greeting: req.body.greeting
    }
    
    const updateQuery = {
        $set: {...data, ...{
            updation: new Date()
        }},
        $inc: {'actionCount' :1}
    }

    User.findOneAndUpdate({$and:[{status: 1}, {_id: userid}]}, updateQuery, (err: any, data: any) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.UserUpdateFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.UserUpdateSuccess, true));
        }
    })
}

/**
 * Reset user password.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putPasswordReset = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)

    User.aggregate([
        { '$match': { '_id': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.PasswordResetFailed, false));
        } else if(data.length !== 0) {
            const checkpass = await decrypt(req.body.currentpassword, data[0].password);
            if(checkpass) {
                const hash = await encrypt(req.body.newpassword);

                const data = {
                    password: hash
                }
                
                const updateQuery = {
                    $set: {...data, ...{
                        updation: new Date()
                    }},
                    $inc: {'actionCount' :1}
                }
            
                User.findOneAndUpdate({$and:[{status: 1}, {_id: userid}]}, updateQuery, (err: any, data: any) => {
                    if(err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.PasswordResetFailed, false));
                    } else {
                        res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.PasswordResetSuccess, true));
                    }
                })
            } else {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.IncorrectCurrentPassword, false));
            }
        } else {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.UserNotFound, false));
        }
    })
}
