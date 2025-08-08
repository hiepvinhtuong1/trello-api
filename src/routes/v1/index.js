/* eslint-disable indent */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute.js'
import { columnRoute } from '~/routes/v1/columnRoute.js'
import { cardRoute } from '~/routes/v1/cardRoute.js'

const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'API v1 is running'
    })
})

// Board APIs
Router.use('/boards', boardRoute)

// Column APIs
Router.use('/columns', columnRoute)

// Card APIs
Router.use('/cards', cardRoute)

export const APIs_V1 = Router