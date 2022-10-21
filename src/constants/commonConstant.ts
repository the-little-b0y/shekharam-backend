import { ApiResponse, ResponseCodeObject } from "../contracts/commonInterface"

/** Server generated response codes */
export const ResponseCodes = {
    UserCreated: 1000
}

/** Server generated response code and their message */
const responseCodeObjects: ResponseCodeObject[] = [{
    code: ResponseCodes.UserCreated,
    message: 'User Created'
}]

/** Fallback response code */
const responseNotFoundObject: ResponseCodeObject = {
    code: 0,
    message: 'Response Not Found'
}

/**
 * Get corresponding server generated API response
 * @param {number} code - Valid ResponseCode.
 * @param {boolean} OK - Status OK.
 * @param {any} data - Return data, if any.
 * @returns {ApiResponse} ApiResponse of corresponding code.
 */
export const getResponseCodeObject = (code : number, OK: boolean, data?: any): ApiResponse => {
    const responseCodeObject = responseCodeObjects.find(element => element.code === code) || responseNotFoundObject
    const apiResponse: ApiResponse = {
        OK,
        code: responseCodeObject.code,
        message: responseCodeObject.message,
        data
    }
    
    return apiResponse
}
