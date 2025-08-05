import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json({
            message: 'Board created successfully',
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: error.message
        });
        return;
    }
}

export const boardController = {
    createNew
}