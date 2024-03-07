import express from "express";
import drugController from "../../controllers/drug-controller.js";

const router = express.Router();

router.get("/", drugController.getDrug);

export default router;
