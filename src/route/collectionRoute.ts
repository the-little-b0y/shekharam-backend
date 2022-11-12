import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { deleteCollection, getCollection, getCollectionIdByCopyQR, getCollectionIdBySetQR, getSingleCollection, postCollection, putCollection } from '../controller/collectionController';
import { validateRequest } from '../utils/requestValidator';
import { deleteCollectionValidator, getCollectionIdByCopyQRValidator, getCollectionIdBySetQRValidator, getCollectionValidator, getSingleCollectionValidator, postCollectionValidator, putCollectionValidator } from '../validator/collectionValidator';

export const router = Router();

router.post('/', isauthorized, postCollectionValidator, validateRequest, postCollection);
router.get('/collectionsetqr', isauthorized, getCollectionIdBySetQRValidator, validateRequest, getCollectionIdBySetQR)
router.get('/copyqr', isauthorized, getCollectionIdByCopyQRValidator, validateRequest,  getCollectionIdByCopyQR)
router.get('/:id', isauthorized, getSingleCollectionValidator, validateRequest, getSingleCollection)
router.get('/', isauthorized, getCollectionValidator, validateRequest, getCollection);
router.put('/', isauthorized, putCollectionValidator, validateRequest, putCollection);
router.delete('/', isauthorized, deleteCollectionValidator, validateRequest, deleteCollection);
