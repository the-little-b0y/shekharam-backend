import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { deleteCollectionItemType, getConfiguration, postCollectionItemType, putCollectionItemType } from '../controller/configurationController';
import { validateRequest } from '../utils/requestValidator';
import { deleteCollectionItemTypeValidator, postCollectionItemTypeValidator, putCollectionItemTypeValidator } from '../validator/configurationValidator';

export const router = Router();

router.get('/', isauthorized, getConfiguration);
router.post('/collectionitemtype', isauthorized, postCollectionItemTypeValidator, validateRequest, postCollectionItemType);
router.put('/collectionitemtype', isauthorized, putCollectionItemTypeValidator, validateRequest, putCollectionItemType);
router.delete('/collectionitemtype', isauthorized, deleteCollectionItemTypeValidator, validateRequest, deleteCollectionItemType);
