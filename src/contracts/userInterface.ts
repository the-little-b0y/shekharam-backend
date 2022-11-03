export interface UserInterface {
    mobileNumber: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    avatar?: string,
    greeting?: string,
    status: number,
    actionCount: number,
    creation: Date,
    updation: Date
}
