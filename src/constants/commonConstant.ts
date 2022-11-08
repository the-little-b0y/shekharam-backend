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
    ConditionTypeCreationSuccess: 1026,
    ConditionTypeCreationFailed: 1027,
    ConditionTypeUpdationSuccess: 1028,
    ConditionTypeUpdationFailed: 1029,
    DuplicateConditionType: 1030,
    ConditionTypeDeletionSuccess: 1031,
    ConditionTypeDeletionFailed: 1032,
    SimilarCollectionItemType: 1033,
    CurrencyUpdationSuccess: 1034,
    CurrencyUpdationFailed: 1035,
    CollectionCreationSuccess: 1036,
    CollectionCreationFailed: 1037,
    CollectionUpdationSuccess: 1038,
    CollectionUpdationFailed: 1039,
    CollectionDeletionSuccess: 1040,
    CollectionDeletionFailed: 1041,
    DuplicateCollection: 1042,
    QrCodeExistInCollection: 1043,
    CollectionFetchSuccess: 1044,
    CollectionFetchFailed: 1045,
    ConditionTypeExistInCollection: 1046
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
    message: 'Collection Created Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeCreationFailed,
    message: 'Collection Creation Failed'
}, {
    code: ResponseCodes.CollectionItemTypeUpdationSuccess,
    message: 'Collection Updated Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeUpdationFailed,
    message: 'Collection Updation Failed'
}, {
    code: ResponseCodes.ConfigurationFetchSuccess,
    message: 'Configuration Fetched Successfully'
}, {
    code: ResponseCodes.ConfigurationFetchFailed,
    message: 'Configuration Fetch Failed'
}, {
    code: ResponseCodes.DuplicateCollectionItemType,
    message: 'Collection already added'
}, {
    code: ResponseCodes.ConfigurationNotFound,
    message: 'Configuration Not Found'
}, {
    code: ResponseCodes.CollectionItemTypeDeletionSuccess,
    message: 'Collection Deleted Successfully'
}, {
    code: ResponseCodes.CollectionItemTypeDeletionFailed,
    message: 'Collection Deletion Failed'
}, {
    code: ResponseCodes.ConditionTypeCreationSuccess,
    message: 'Condition Type Created Successfully'
}, {
    code: ResponseCodes.ConditionTypeCreationFailed,
    message: 'Condition Type Creation Failed'
}, {
    code: ResponseCodes.ConditionTypeUpdationSuccess,
    message: 'Condition Type Updated Successfully'
}, {
    code: ResponseCodes.ConditionTypeUpdationFailed,
    message: 'Condition Type Updation Failed'
}, {
    code: ResponseCodes.DuplicateConditionType,
    message: 'Condition Type already added'
}, {
    code: ResponseCodes.ConditionTypeDeletionSuccess,
    message: 'Condition Type Deleted Successfully'
}, {
    code: ResponseCodes.ConditionTypeDeletionFailed,
    message: 'Condition Type Deletion Failed'
}, {
    code: ResponseCodes.SimilarCollectionItemType,
    message: 'Similar Collection already added'
},  {
    code: ResponseCodes.CurrencyUpdationSuccess,
    message: 'Currency Updated Successfully'
}, {
    code: ResponseCodes.CurrencyUpdationFailed,
    message: 'Currency Updation Failed'
}, {
    code: ResponseCodes.CollectionCreationSuccess,
    message: 'Item Collection Created Successfully'
}, {
    code: ResponseCodes.CollectionCreationFailed,
    message: 'Item Collection Creation Failed'
}, {
    code: ResponseCodes.CollectionUpdationSuccess,
    message: 'Item Collection Updated Successfully'
}, {
    code: ResponseCodes.CollectionUpdationFailed,
    message: 'Item Collection Updation Failed'
}, {
    code: ResponseCodes.CollectionDeletionSuccess,
    message: 'Item Collection Deleted Successfully'
}, {
    code: ResponseCodes.CollectionDeletionFailed,
    message: 'Item Collection Deletion Failed'
}, {
    code: ResponseCodes.DuplicateCollection,
    message: 'Item Collection with same Item Name, Color, Year of production and Unique Feature already added'
}, {
    code: ResponseCodes.QrCodeExistInCollection,
    message: 'Copy QR Codes and Collection Set QR Code already exist in other Item Collections'
}, {
    code: ResponseCodes.CollectionFetchSuccess,
    message: 'Item Collections Fetched Successfully'
}, {
    code: ResponseCodes.CollectionFetchFailed,
    message: 'Item Collections Fetch Failed'
}, {
    code: ResponseCodes.ConditionTypeExistInCollection,
    message: 'Cannot delete Condition type, since this condition is added for some Collection copies'
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
