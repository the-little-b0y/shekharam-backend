import { ValidationError } from "express-validator"
import { ApiResponse, ResponseCodeObject } from "../contracts/commonInterface"
import { Request } from "express";
import { logger } from '../utils/logger';

/** Server generated response codes */
export const ResponseCodes = {
    RequestValidationFailed: 1000,
    UserCreationSuccess: 1001,
    UserCreationFailed: 1002,
    ExistingRegisteredMobileNumber: 1003,
    AuthenticationSuccess: 1004,
    AuthenticationFailed: 1005,
    UserNotFound: 1006,
    PasswordIncorrect: 1007,
    AuthorizationFailed: 1008,
    UserFetchFailed: 1009,
    UserFetchSuccess: 1010,
    UserUpdateFailed: 1011,
    UserUpdateSuccess: 1012
}

/** Server generated response code and their message */
const responseCodeObjects: ResponseCodeObject[] = [{
    code: ResponseCodes.RequestValidationFailed,
    message: 'Request Validation Failed'
}, {
    code: ResponseCodes.UserCreationSuccess,
    message: 'User Creation Success'
}, {
    code: ResponseCodes.UserCreationFailed,
    message: 'User Creation Failed'
}, {
    code: ResponseCodes.ExistingRegisteredMobileNumber,
    message: 'Mobile Number is already Registered'
}, {
    code: ResponseCodes.AuthenticationSuccess,
    message: 'Authentication Success'
}, {
    code: ResponseCodes.AuthenticationFailed,
    message: 'Authentication Failed'
}, {
    code: ResponseCodes.UserNotFound,
    message: 'User not Registered'
}, {
    code: ResponseCodes.PasswordIncorrect,
    message: 'Incorrect Password'
}, {
    code: ResponseCodes.AuthorizationFailed,
    message: 'Authorization Failed'
}, {
    code: ResponseCodes.UserFetchFailed,
    message: 'User Fetch Failed'
}, {
    code: ResponseCodes.UserFetchSuccess,
    message: 'User Fetched Successfully'
}, {
    code: ResponseCodes.UserUpdateFailed,
    message: 'User Update Failed'
}, {
    code: ResponseCodes.UserUpdateSuccess,
    message: 'User Updated Successfully'
}]

/** Fallback response code */
const responseNotFoundObject: ResponseCodeObject = {
    code: 0,
    message: 'Response Not Found'
}

/**
 * Get corresponding server generated API response.
 * @param {express.Request} req - Express request object.
 * @param {number} code - Valid ResponseCode.
 * @param {boolean} OK - Status OK.
 * @param {any} data - Return data, if any.
 * @returns {ApiResponse} ApiResponse of corresponding code.
 */
export const getResponseCodeObject = (req: Request, code : number, OK: boolean, data?: any, errors?: ValidationError[]): ApiResponse => {
    const responseCodeObject = responseCodeObjects.find(element => element.code === code) || responseNotFoundObject
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    OK ? logger.info(`${new Date().toLocaleString('en-GB')} : ${req.method} - ${url}, msg: ${responseCodeObject.message}`) : logger.error(`${new Date().toLocaleString('en-GB')} : ${req.method} - ${url}, msg: ${responseCodeObject.message}`)
    const apiResponse: ApiResponse = {
        OK,
        code: responseCodeObject.code,
        message: responseCodeObject.message,
        data,
        errors
    }
    
    return apiResponse
}
