import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import apiRoutes from './api/routes/index.ts';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});