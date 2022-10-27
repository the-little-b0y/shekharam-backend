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
    UserUpdateSuccess: 1012,
    PasswordResetSuccess: 1013,
    PasswordResetFailed: 1014,
    IncorrectCurrentPassword: 1015,
    CollectionItemTypeCreationSuccess: 1016,
    CollectionItemTypeCreationFailed: 1017,
    CollectionItemTypeUpdationSuccess: 1018,
    CollectionItemTypeUpdationFailed: 1019,
    ConfigurationFetchSuccess: 1020,
    ConfigurationFetchFailed: 1021,
    DuplicateCollectionItemType: 1022,
    ConfigurationNotFound: 1023,
    CollectionItemTypeDeletionSuccess: 1024,
    CollectionItemTypeDeletionFailed: 1025,
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
}, {
    code: ResponseCodes.PasswordResetSuccess,
    message: 'Password Reset Successfully'
}, {
    code: ResponseCodes.PasswordResetFailed,
    message: 'Password Reset Failed'
}, {
    code: ResponseCodes.IncorrectCurrentPassword,
    message: 'Incorrect Current Password'
}, {
    code: ResponseCodes.CollectionItemTypeCreationSuccess,
    message: 'Collection Item Type Created Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeCreationFailed,
    message: 'Collection Item Type Creation Failed'
}, {
    code: ResponseCodes.CollectionItemTypeUpdationSuccess,
    message: 'Collection Item Type Updated Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeUpdationFailed,
    message: 'Collection Item Type Updation Failed'
}, {
    code: ResponseCodes.ConfigurationFetchSuccess,
    message: 'Configuration Fetched Successfully'
}, {
    code: ResponseCodes.ConfigurationFetchFailed,
    message: 'Configuration Fetch Failed'
}, {
    code: ResponseCodes.DuplicateCollectionItemType,
    message: 'Collection Item Type already added'
}, {
    code: ResponseCodes.ConfigurationNotFound,
    message: 'Configuration Not Found'
}, {
    code: ResponseCodes.CollectionItemTypeDeletionSuccess,
    message: 'Collection Item Type Deleted Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeDeletionFailed,
    message: 'Collection Item Type Deletion Failed'
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
