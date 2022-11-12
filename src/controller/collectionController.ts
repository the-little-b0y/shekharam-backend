import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";
import { checkDataExists } from "../utils/dbValidator";
import { Types } from "mongoose";
import { Collection } from "../database/models/collectionModal";
import { CollectionCopyInterface, CollectionInterface } from "../contracts/collectionInterface";

/**
 * Post Collection Item to the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postCollection = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)

    checkDataExists(Collection, { $and: [{'userid': userid}, {status: 1}, {itemName: req.body.itemName}, {color: req.body.color}, {year: req.body.year}, {uniqueFeature: req.body.uniqueFeature}] }, async (err, exists) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionCreationFailed, false));
        } else if(exists) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateCollection, false));
        } else {
            const allQrs = [req.body.collectionSetQrcode, ...req.body.copies.map((copy: CollectionCopyInterface) => copy.copyqrcode)]
            checkDataExists(Collection, { $and: [{'userid': userid}, {status: 1}, {$or: [{ collectionSetQrcode: {$in: allQrs} }, { 'copies.copyqrcode': {$in: allQrs} }]}] }, async (err, exists) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionCreationFailed, false));
                } else if(exists) {
                    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.QrCodeExistInCollection, false));
                } else {
                    const collection = new Collection<CollectionInterface>({
                        userid: userid,
                        collectionof: req.body.collectionof,
                        itemName: req.body.itemName,
                        color: req.body.color,
                        year: req.body.year,
                        uniqueFeature: req.body.uniqueFeature,
                        collectionSetQrcode: req.body.collectionSetQrcode,
                        country: req.body.country,
                        copies: req.body.copies,
                        status: 1,
                        actionCount: 1,
                        creation: new Date(),
                        updation: new Date()
                    });
                
                    collection.save((err, data) => {
                        if(err) {
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionCreationFailed, false));
                        } else {
                            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionCreationSuccess, true));
                        }
                    });
                }
            })
        }
    })
}

/**
 * Get Collection Item.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getCollection = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Collection.aggregate([
        { '$match': { $and: [{'userid': userid}, {collectionof: req.query.collectionof}, {status: 1}] } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchSuccess, true, data));
        }
    })
}

/**
 * Get Collection Item by Id.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getSingleCollection = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id); const id = Types.ObjectId(req.params.id)
    Collection.aggregate([
        { '$match': { $and: [{'userid': userid}, {_id: id}, {status: 1}] } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchSuccess, true, data[0]));
        }
    })
}

/**
 * Get Collection Item Id by set qr.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getCollectionIdBySetQR = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id);
    Collection.aggregate([
        { '$match': { $and: [{'userid': userid}, {collectionSetQrcode: req.query.collectionsetqr}, {status: 1}] } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchFailed, false));
        } else {
            const returndata = (data.length > 0) ? {_id: data[0]._id} : {_id: null}
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchSuccess, true, returndata));
        }
    })
}

/**
 * Get Collection Item Id by copy qr.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getCollectionIdByCopyQR = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id);
    Collection.aggregate([
        { '$match': { $and: [{'userid': userid}, {'copies.copyqrcode': req.query.copyqr}, {status: 1}] } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchFailed, false));
        } else {
            let returndata = (data.length > 0) ? {_id: data[0]._id} : {_id: null, copyid: null}
            if(data.length > 0) {
                const copy = data[0].copies.find((element: CollectionCopyInterface) => element.copyqrcode === req.query.copyqr)
                returndata = {...returndata, ...{copyid: copy._id}}
            }
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionFetchSuccess, true, returndata));
        }
    })
}

/**
 * Delete a Collection Item.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const deleteCollection = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)

    const updateQuery = {
        $set: {
            status: 0,
            updation: new Date()
        },
        $inc: {'actionCount' :1}
    }

    Collection.findOneAndUpdate({$and:[{status: 1}, {userid: userid}, {_id: req.query._id}]}, updateQuery, (err: any, data: any) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionDeletionFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionDeletionSuccess, true));
        }
    })
}

/**
 * Update Collection Item.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putCollection = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id); const id = Types.ObjectId(req.body._id)

    checkDataExists(Collection, { $and: [{_id : {$ne: id}}, {'userid': userid}, {status: 1}, {itemName: req.body.itemName}, {color: req.body.color}, {year: req.body.year}, {uniqueFeature: req.body.uniqueFeature}] }, async (err, exists) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionUpdationFailed, false));
        } else if(exists) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateCollection, false));
        } else {
            const allQrs = [req.body.collectionSetQrcode, ...req.body.copies.map((copy: CollectionCopyInterface) => copy.copyqrcode)]
            checkDataExists(Collection, { $and: [{_id : {$ne: id}}, {'userid': userid}, {status: 1}, {$or: [{ collectionSetQrcode: {$in: allQrs} }, { 'copies.copyqrcode': {$in: allQrs} }]}] }, async (err, exists) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionUpdationFailed, false));
                } else if(exists) {
                    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.QrCodeExistInCollection, false));
                } else {
                    const data = {
                        itemName: req.body.itemName,
                        color: req.body.color,
                        year: req.body.year,
                        uniqueFeature: req.body.uniqueFeature,
                        collectionSetQrcode: req.body.collectionSetQrcode,
                        country: req.body.country,
                        copies: req.body.copies
                    }
    
                    const updateQuery = {
                        $set: {...data, ...{
                            updation: new Date()
                        }},
                        $inc: {'actionCount' :1}
                    }
                
                    Collection.findOneAndUpdate({$and:[{status: 1}, {userid: userid}, {_id: req.body._id}]}, updateQuery, (err: any, data: any) => {
                        if(err) {
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeUpdationFailed, false));
                        } else {
                            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeUpdationSuccess, true));
                        }
                    })
                }
            })
        }
    })
}