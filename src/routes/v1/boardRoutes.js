import express from 'express';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: 'Board API is running'
        })
    })
    .post((req, res) => {
        res.status(StatusCodes.CREATED).json({
            message: 'Board created successfully'
        })
    })

export const boardRoutes = Router