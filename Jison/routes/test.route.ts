
import { Router } from "express";
import { testController } from "../controllers/test.controller";

const router = Router();

router.get("/", testController);

export default router;