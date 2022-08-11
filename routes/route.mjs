import express from "express";
const router = express.Router();

import {generateBuffer, getAndSend} from '../controllers/to_pdf.mjs';

router.post('/generate', generateBuffer);
router.get('/get/:name', getAndSend);

export default router;
