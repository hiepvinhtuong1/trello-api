import Joi from 'joi';
import { StatusCodes } from 'http-status-codes'
import e from 'express'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must not exceed 50 characters',
            'string.trim': 'Title cannot have leading or trailing spaces'
        }),
        description: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Description is required',
            'string.empty': 'Description cannot be empty',
            'string.min': 'Description must be at least 3 characters long',
            'string.max': 'Description must not exceed 50 characters',
            'string.trim': 'Description cannot have leading or trailing spaces'
        })
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        //Validate dữ liệu thành công, tiếp tục xử lý
        next()
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }

}

export const boardValidation = {
    createNew
}