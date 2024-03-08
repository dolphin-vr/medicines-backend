import express from 'express';
import assortmentController from "../../controllers/assortment-controller.js";
import { isEmptyBody, } from '../../middlewares/index.js';
import {bodyValidator} from '../../decorators/index.js';
import { assortmentAddSchema } from "../../models/Assortment.js";

const router = express.Router();


router.route('/')
   .get(assortmentController.getAssortment)
   .delete(assortmentController.deleteAll)
   .post(isEmptyBody, bodyValidator(assortmentAddSchema), assortmentController.add);


export default router;
