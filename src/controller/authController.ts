import { Request, Response, NextFunction } from "express";
import { User } from '../database/models/userModal';
import { StatusCodes } from 'http-status-codes';
import { decrypt } from '../utils/passwordHash';
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";
import { ValidationError } from "express-validator";
import passport from 'passport';
import jwt from 'jsonwebtoken';

const jwtsecret: string = process.env.JWT_SECRET || 'jwtsecret'
const jwtsecretExp: string = process.env.JWT_SECRET_EXPIRY || '24h'
const refreshsecret: string = process.env.JWT_REFRESH_SECRET || 'refreshsecret'
const refreshsecretExp: string = process.env.JWT_REFRESH_SECRET_EXPIRY || '45d'

/**
 * Authenticate using passport.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const passportAuthenticate = (req: Request, res: Response) => {
    passport.authenticate("strategyU1", {session: false}, (err, passportReturn) => {
        const { statuscode, responsecode, OK, data } = passportReturn
        if(!OK) {
            res.status(statuscode).json(getResponseCodeObject(req, responsecode, OK));
        } else {
            req.login(data, {session: false}, (err) => {
                if (err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.AuthenticationFailed, false));
                } else {
                    const jwtData = {
                        _id: data._id,
                        mobileNumber: data.mobileNumber,
                        status: data.status
                    }

                    const accessToken = jwt.sign(jwtData, jwtsecret, { expiresIn: jwtsecretExp });
                    const refreshtoken = jwt.sign(jwtData, refreshsecret, { expiresIn: refreshsecretExp });
                    const returnData = {
                        userid: data._id,
                        mobileNumber: data.mobileNumber,
                        tokenType: 'Bearer',
                        accessToken: accessToken, 
                        refreshToken: refreshtoken,
                    }

                    res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.AuthenticationSuccess, true, returnData));
                }
            });
        }
    })(req, res);
}

/**
 * Check if user is authorised.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 */
export const isauthorized = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("strategyU2", {session: false}, (err, user, info) => {
        if(user) {
            const passportuser = {
                _id: user._id,
                mobileNumber: user.mobileNumber,
                status: user.status,
                iat: user.iat,
                exp: user.exp
            }
            req.user = passportuser;
            next();
        } else if(!user && info && info.name) {
            const error: ValidationError = {
                location: 'body',
                param: '',
                value: 'JwtError',
                msg: info.name,
            }
            res.status(StatusCodes.UNAUTHORIZED).json(getResponseCodeObject(req, ResponseCodes.AuthorizationFailed, false, undefined, [error]));
        }  else {
            const error: ValidationError = {
                location: 'body',
                param: '',
                value: 'JwtError',
                msg: 'JwtError',
            }
            res.status(StatusCodes.UNAUTHORIZED).json(getResponseCodeObject(req, ResponseCodes.AuthorizationFailed, false, undefined, [error]));
        }
    })(req, res);
}

/**
 * Perform login.
 * @param {string} mobileNumber - Mobile number for Request.
 * @param {string} password - Password for Request.
 * @param {function(number, number, boolean, any): void} callback - Callback function.
 */
export const login = (mobileNumber: string, password: string, callback: (statuscode: number, responsecode: number, OK: boolean, data?: any) => void) => {
    User.aggregate([
        { '$match': { 'mobileNumber': mobileNumber } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            callback(StatusCodes.INTERNAL_SERVER_ERROR, ResponseCodes.AuthenticationFailed, false)
        } else if(data.length !== 0) {
            const checkpass = await decrypt(password, data[0].password);
            if(checkpass) {
                callback(StatusCodes.OK, ResponseCodes.AuthenticationSuccess, true, data[0])
            } else {
                callback(StatusCodes.UNPROCESSABLE_ENTITY, ResponseCodes.PasswordIncorrect, false)
            }
        } else {
            callback(StatusCodes.UNPROCESSABLE_ENTITY, ResponseCodes.UserNotFound, false)
        }
    })
}
