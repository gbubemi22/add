import { Router } from "express";

import FormRouter from './formRouter.js';


const router = Router();


//Use router

router.use("/api/v1/forms", FormRouter);

export default router;
