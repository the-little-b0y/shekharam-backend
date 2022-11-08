import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { deleteCollection, getCollection, getSingleCollection, postCollection, putCollection } from '../controller/collectionController';
import { validateRequest } from '../utils/requestValidator';
import { deleteCollectionValidator, getCollectionValidator, getSingleCollectionValidator, postCollectionValidator, putCollectionValidator } from '../validator/collectionValidator';

export const router = Router();

router.post('/', isauthorized, postCollectionValidator, validateRequest, postCollection);
router.get('/:id', isauthorized, getSingleCollectionValidator, validateRequest, getSingleCollection)
router.get('/', isauthorized, getCollectionValidator, validateRequest, getCollection);
router.put('/', isauthorized, putCollectionValidator, validateRequest, putCollection);
router.delete('/', isauthorized, deleteCollectionValidator, validateRequest, deleteCollection);
