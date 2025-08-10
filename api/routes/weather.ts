import { Router } from 'express';
import { getWeather } from '../controllers/weatherController.ts';

const router = Router();

router.get('/', getWeather);

export default router;