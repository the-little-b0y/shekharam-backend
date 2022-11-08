import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { deleteCollectionItemType, deleteConditionType, getConfiguration, postCollectionItemType, postConditionType, putCollectionItemType, putConditionType, putCurrency } from '../controller/configurationController';
import { validateRequest } from '../utils/requestValidator';
import { deleteCollectionItemTypeValidator, deleteConditionTypeValidator, postCollectionItemTypeValidator, postConditionTypeValidator, putCollectionItemTypeValidator, putConditionTypeValidator, putCurrencyValidator } from '../validator/configurationValidator';

export const router = Router();

router.get('/', isauthorized, getConfiguration);
router.post('/collectionitemtype', isauthorized, postCollectionItemTypeValidator, validateRequest, postCollectionItemType);
router.put('/collectionitemtype', isauthorized, putCollectionItemTypeValidator, validateRequest, putCollectionItemType);
router.delete('/collectionitemtype', isauthorized, deleteCollectionItemTypeValidator, validateRequest, deleteCollectionItemType);
router.post('/conditiontype', isauthorized, postConditionTypeValidator, validateRequest, postConditionType);
router.put('/conditiontype', isauthorized, putConditionTypeValidator, validateRequest, putConditionType);
router.delete('/conditiontype', isauthorized, deleteConditionTypeValidator, validateRequest, deleteConditionType);
router.put('/currency', isauthorized, putCurrencyValidator, validateRequest, putCurrency);
