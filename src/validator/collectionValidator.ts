import { body, param, query, ValidationChain } from 'express-validator';

export const postCollectionValidator: ValidationChain[] = [
    body('collectionof', 'Collection of not present').exists(),
    body('itemName', 'Item Name not present').exists(),
    body('color', 'Color not present').exists(),
    body('year', 'Year of Production not present').exists(),
    body('uniqueFeature', 'Unique Feature not present').exists(),
    body('collectionSetQrcode', 'Collection Set QR Code not present').exists(),
    body('country', 'Country not present').exists(),
    body('copies', 'Copies not present').exists(),
    body('copies', 'Copies is not an Array').isArray(),
    body('copies.*.copyqrcode', 'Copy QR Code is not present in some Copies').exists(),
    body('copies.*.condition', 'Condition is not present in some Copies').exists(),
    body('copies.*.purchaseprice', 'Purchase Price is not present in some Copies').exists(),
    body('copies.*.marketprice', 'Market Price is not present in some Copies').exists(),
    body('copies.*.remarks', 'Remarks is not present in some Copies').exists(),
    body('copies.*.collectedfrom', 'Collected from is not present in some Copies').exists(),
    body('copies.*.collectedon', 'Collected on is not present in some Copies').exists()
]

export const putCollectionValidator: ValidationChain[] = [
    body('collectionof', 'Collection of not present').exists(),
    body('_id', '_id not present').exists(),
    body('itemName', 'Item Name not present').exists(),
    body('color', 'Color not present').exists(),
    body('year', 'Year of Production not present').exists(),
    body('uniqueFeature', 'Unique Feature not present').exists(),
    body('collectionSetQrcode', 'Collection Set QR Code not present').exists(),
    body('country', 'Country not present').exists(),
    body('copies', 'Copies not present').exists(),
    body('copies', 'Copies is not an Array').isArray(),
    body('copies.*.copyqrcode', 'Copy QR Code is not present in some Copies').exists(),
    body('copies.*.condition', 'Condition is not present in some Copies').exists(),
    body('copies.*.purchaseprice', 'Purchase Price is not present in some Copies').exists(),
    body('copies.*.marketprice', 'Market Price is not present in some Copies').exists(),
    body('copies.*.remarks', 'Remarks is not present in some Copies').exists(),
    body('copies.*.collectedfrom', 'Collected from is not present in some Copies').exists(),
    body('copies.*.collectedon', 'Collected on is not present in some Copies').exists()
]

export const deleteCollectionValidator: ValidationChain[] = [
    query('_id', '_id not present').exists()
]

export const getCollectionValidator: ValidationChain[] = [
    query('collectionof', 'Collection of not present').exists(),
]

export const getSingleCollectionValidator: ValidationChain[] = [
    param('id', 'Id not present').exists()
]
