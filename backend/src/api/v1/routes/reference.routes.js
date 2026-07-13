import { Router } from 'express';
import { referenceController } from '../../../controllers/reference.controller.js';

const router = Router();
router.get('/disciplines', referenceController.disciplines);
router.get('/majors', referenceController.majors);
export default router;