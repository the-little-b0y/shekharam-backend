import { body, query, ValidationChain } from 'express-validator';

export const postCollectionItemTypeValidator: ValidationChain[] = [
    body('itemtype', 'Item type not present').exists(),
    body('itemimage', 'Item image not present').exists()
]

export const putCollectionItemTypeValidator: ValidationChain[] = [
    body('_id', '_id not present').exists(),
    body('itemtype', 'Item type not present').exists(),
    body('itemimage', 'Item image not present').exists()
]

export const deleteCollectionItemTypeValidator: ValidationChain[] = [
    query('_id', '_id not present').exists()
]
