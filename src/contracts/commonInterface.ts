import { ValidationError } from "express-validator";

export interface ResponseCodeObject {
    code: number,
    message: string,
}

export interface ApiResponse extends ResponseCodeObject {
    OK: boolean,
    data?: any,
    errors?: ValidationError[]
}
