import { Router } from 'express';
import { assessmentController } from '../../../controllers/assessment.controller.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { startSchema, answerSchema, idParamSchema }
  from '../../../validators/assessment.validator.js';

const router = Router();
router.post('/', validate(startSchema), assessmentController.start);
router.post('/:id/answers', validate(answerSchema), assessmentController.saveAnswer);
router.get('/:id/next', validate(idParamSchema), assessmentController.getNext);
router.post('/:id/finalize', validate(idParamSchema), assessmentController.finalize);
export default router;