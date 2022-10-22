import { ValidationError } from "express-validator"
import { ApiResponse, ResponseCodeObject } from "../contracts/commonInterface"

/** Server generated response codes */
export const ResponseCodes = {
    RequestValidationFailed: 1000,
    UserCreationSuccess: 1001,
    UserCreationFailed: 1002,
    ExistingRegisteredMobileNumber: 1003
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
}]

/** Fallback response code */
const responseNotFoundObject: ResponseCodeObject = {
    code: 0,
    message: 'Response Not Found'
}

/**
 * Get corresponding server generated API response.
 * @param {number} code - Valid ResponseCode.
 * @param {boolean} OK - Status OK.
 * @param {any} data - Return data, if any.
 * @returns {ApiResponse} ApiResponse of corresponding code.
 */
export const getResponseCodeObject = (code : number, OK: boolean, data?: any, errors?: ValidationError[]): ApiResponse => {
    const responseCodeObject = responseCodeObjects.find(element => element.code === code) || responseNotFoundObject
    const apiResponse: ApiResponse = {
        OK,
        code: responseCodeObject.code,
        message: responseCodeObject.message,
        data,
        errors
    }
    
    return apiResponse
}
