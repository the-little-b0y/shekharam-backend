import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { getResponseCodeObject, ResponseCodes } from "../constants/commonConstant";
import { Types } from "mongoose";
import { Configuration } from "../database/models/configurationModal";
import { ConfigurationInterface } from "../contracts/configurationInterface";

/**
 * Create a new Collection Item Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postCollectionItemType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Configuration.aggregate([
        { '$match': { 'userid': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeCreationFailed, false));
        }  else if(data.length !== 0) {  
            const isDuplicate = data[0].collectionItemTypes.find((elem: any) => elem.itemtype.trim().toLowerCase() === req.body.itemtype.trim().toLowerCase())
            const isSimilar = data[0].collectionItemTypes.find((elem: any) => elem.itemtype.trim().toLowerCase().replace(/\s/g,'') === req.body.itemtype.trim().toLowerCase().replace(/\s/g,''))
            if(isDuplicate) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateCollectionItemType, false));
            } else if(isSimilar) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.SimilarCollectionItemType, false));
            } else {
                const updateQuery = {
                    $addToSet: { 
                        collectionItemTypes: req.body
                    },
                    $set: {
                        updation: new Date()
                    },
                    $inc: {'actionCount' :1}
                }
            
                Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}]}, updateQuery, (err: any, data: any) => {
                    if(err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeCreationFailed, false));
                    } else {
                        res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeCreationSuccess, true));
                    }
                })
            }
        } else {
            const configuration = new Configuration<ConfigurationInterface>({
                userid: userid,
                collectionItemTypes: [req.body],
                conditionTypes: [],
                status: 1,
                actionCount: 1,
                creation: new Date(),
                updation: new Date()
            });
        
            configuration.save((err, data) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeCreationFailed, false));
                } else {
                    res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeCreationSuccess, true));
                }
            });
        }
    })
}

/**
 * Create a new Condition Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const postConditionType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Configuration.aggregate([
        { '$match': { 'userid': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeCreationFailed, false));
        }  else if(data.length !== 0) {  
            const isDuplicate = data[0].conditionTypes.find((elem: any) => elem.conditiontype.trim().toLowerCase() === req.body.conditiontype.trim().toLowerCase())
            if(isDuplicate) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateConditionType, false));
            } else {
                const updateQuery = {
                    $addToSet: { 
                        conditionTypes: req.body
                    },
                    $set: {
                        updation: new Date()
                    },
                    $inc: {'actionCount' :1}
                }
            
                Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}]}, updateQuery, (err: any, data: any) => {
                    if(err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeCreationFailed, false));
                    } else {
                        res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeCreationSuccess, true));
                    }
                })
            }
        } else {
            const configuration = new Configuration<ConfigurationInterface>({
                userid: userid,
                collectionItemTypes: [],
                conditionTypes: [req.body],
                status: 1,
                actionCount: 1,
                creation: new Date(),
                updation: new Date()
            });
        
            configuration.save((err, data) => {
                if(err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeCreationFailed, false));
                } else {
                    res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeCreationSuccess, true));
                }
            });
        }
    })
}

/**
 * Get Configuration - self data.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const getConfiguration = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Configuration.aggregate([
        { '$match': { 'userid': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConfigurationFetchFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.ConfigurationFetchSuccess, true, data[0]));
        }
    })
}

/**
 * Update a Collection Item Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putCollectionItemType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Configuration.aggregate([
        { '$match': { 'userid': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeUpdationFailed, false));
        }  else if(data.length !== 0) {  
            const isDuplicate = data[0].collectionItemTypes.find((elem: any) => ((elem.itemtype.trim().toLowerCase() === req.body.itemtype.trim().toLowerCase()) && (String(elem._id) !== String(req.body._id))))
            const isSimilar = data[0].collectionItemTypes.find((elem: any) => ((elem.itemtype.trim().toLowerCase().replace(/\s/g,'') === req.body.itemtype.trim().toLowerCase().replace(/\s/g,'')) && (String(elem._id) !== String(req.body._id))))
            if(isDuplicate) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateCollectionItemType, false));
            } else if(isSimilar) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.SimilarCollectionItemType, false));
            } else {
                const data = {
                    "collectionItemTypes.$.itemtype": req.body.itemtype, 
                    "collectionItemTypes.$.itemimage": req.body.itemimage
                }

                const updateQuery = {
                    $set: {...data, ...{
                        updation: new Date()
                    }},
                    $inc: {'actionCount' :1}
                }
            
                Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}, {"collectionItemTypes._id": req.body._id}]}, updateQuery, (err: any, data: any) => {
                    if(err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeUpdationFailed, false));
                    } else {
                        res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeUpdationSuccess, true));
                    }
                })
            }
        } else {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.ConfigurationNotFound, false));
        }
    })
}

/**
 * Update a Condition Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const putConditionType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)
    Configuration.aggregate([
        { '$match': { 'userid': userid } },
        { '$sort': { 'creation': -1 } }
    ], async (err, data) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeUpdationFailed, false));
        }  else if(data.length !== 0) {  
            const isDuplicate = data[0].conditionTypes.find((elem: any) => ((elem.conditiontype.trim().toLowerCase() === req.body.conditiontype.trim().toLowerCase()) && (String(elem._id) !== String(req.body._id))))
            if(isDuplicate) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.DuplicateConditionType, false));
            } else {
                const data = {
                    "conditionTypes.$.conditiontype": req.body.conditiontype
                }

                const updateQuery = {
                    $set: {...data, ...{
                        updation: new Date()
                    }},
                    $inc: {'actionCount' :1}
                }
            
                Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}, {"conditionTypes._id": req.body._id}]}, updateQuery, (err: any, data: any) => {
                    if(err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeUpdationFailed, false));
                    } else {
                        res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeUpdationSuccess, true));
                    }
                })
            }
        } else {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getResponseCodeObject(req, ResponseCodes.ConfigurationNotFound, false));
        }
    })
}

/**
 * Delete a Collection Item Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const deleteCollectionItemType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)

    const updateQuery = {
        $pull: { collectionItemTypes: { _id: req.query._id } },
        $set: {
            updation: new Date()
        },
        $inc: {'actionCount' :1}
    }

    Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}]}, updateQuery, (err: any, data: any) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeDeletionFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.CollectionItemTypeDeletionSuccess, true));
        }
    })
}

/**
 * Delete a Condition Type.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const deleteConditionType = (req: Request, res: Response) => {
    //@ts-ignore
    const userid = Types.ObjectId(req.user._id)

    const updateQuery = {
        $pull: { conditionTypes: { _id: req.query._id } },
        $set: {
            updation: new Date()
        },
        $inc: {'actionCount' :1}
    }

    Configuration.findOneAndUpdate({$and:[{status: 1}, {userid: userid}]}, updateQuery, (err: any, data: any) => {
        if(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeDeletionFailed, false));
        } else {
            res.status(StatusCodes.OK).json(getResponseCodeObject(req, ResponseCodes.ConditionTypeDeletionSuccess, true));
        }
    })
}
