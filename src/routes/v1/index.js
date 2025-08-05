import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from '~/routes/v1/boardRoutes.js';

const Router = express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'API v1 is running'
    })
})

// Board APIs
Router.use('/boards', boardRoutes);

export const APIs_V1 = Router