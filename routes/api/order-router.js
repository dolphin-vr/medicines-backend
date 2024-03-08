import express from 'express';
import orderController from "../../controllers/order-controller.js";
import { isEmptyBody, userCheck} from '../../middlewares/index.js';

const router = express.Router();

router.use(userCheck);

router.route('/')
   // .get(orderController.getAll)
   // .delete(orderController.deleteAll)
   .post(isEmptyBody, orderController.addOrder);

// router.route('/:id')

// router.route('/:id/favorite')

// router.route('/all')
//    .delete(contactController.deleteAll);

export default router;
