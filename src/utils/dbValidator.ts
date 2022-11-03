import { Model, Document, CallbackError } from "mongoose";

/**
 * Checks if documents satisfying filter query exists in a model.
 * @param {Model<any, any, any>} Model - Mongo model.
 * @param {any} query - Mongo query to check against.
 * @param {function(string, boolean): void} callback - Callback function.
 */
export const checkDataExists = (Model: Model<any, any, any>, query: any, callback: (err: string, exists: boolean) => void) => {
    Model.aggregate([
        { '$match': query },
    ], async (err: CallbackError, data: any[]) => {
        if(err) {
            callback(err.name, false)
        } else {
            callback('', data.length > 0)
        }
    })
}