import Joi from 'joi';
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError.js'


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

        next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error).message))
    }

}

export const boardValidation = {
    createNew
}