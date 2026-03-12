import { Router } from "express";
import { analizar } from "../controllers/parser.controller";

const router = Router();

router.post("/analizar", analizar);

export default router;