import express from 'express';
import assortmentController from "../../controllers/assortment-controller.js";
import {authentication, isEmptyBody, isValidId} from '../../middlewares/index.js';
import {bodyValidator} from '../../decorators/index.js';
import { assortmentAddSchema } from "../../models/Assortment.js";

const router = express.Router();

// router.use(authentication);

router.route('/')
   .get(assortmentController.getAssortment)
   .delete(assortmentController.deleteAll)
   .post(isEmptyBody, bodyValidator(assortmentAddSchema), assortmentController.add);

// router.route('/:id')
//    .get(isValidId, contactController.getById)
//    .put(isValidId, isEmptyBody, bodyValidator(contactsUpdateSchema), contactController.updateById)
//    .delete(isValidId, contactController.deleteById);

// router.route('/:id/favorite')
//    .patch(isValidId, isEmptyBody, bodyValidator(contactFavoriteSchema), contactController.updateFavoriteById);

// router.route('/all')
//    .delete(contactController.deleteAll);

export default router;
