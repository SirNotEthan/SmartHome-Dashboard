import { Router } from 'express';
import weatherRoutes from './weather.ts';

const router = Router();

router.use('/weather', weatherRoutes);

export default router;