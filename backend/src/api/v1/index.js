import { Router } from 'express';
import assessmentRoutes from './routes/assessment.routes.js';
import referenceRoutes from './routes/reference.routes.js';
import healthRoutes from './routes/health.routes.js';

const router = Router();
router.use('/health', healthRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/reference', referenceRoutes);
export default router;