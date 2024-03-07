import express from 'express';
import orderController from "../../controllers/order-controller.js";
import {authentication, isEmptyBody, isValidId} from '../../middlewares/index.js';
import {bodyValidator} from '../../decorators/index.js';
import { orderAddSchema } from "../../models/Order.js";

const router = express.Router();

// router.use(authentication);

router.route('/')
   .get(orderController.getAll)
   .delete(orderController.deleteAll)
   .post(isEmptyBody, bodyValidator(orderAddSchema), orderController.addOrder);

// router.route('/:id')
//    .get(isValidId, contactController.getById)
//    .put(isValidId, isEmptyBody, bodyValidator(contactsUpdateSchema), contactController.updateById)
//    .delete(isValidId, contactController.deleteById);

// router.route('/:id/favorite')
//    .patch(isValidId, isEmptyBody, bodyValidator(contactFavoriteSchema), contactController.updateFavoriteById);

// router.route('/all')
//    .delete(contactController.deleteAll);

export default router;
