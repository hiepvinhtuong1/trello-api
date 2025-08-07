/* eslint-disable indent */
/* eslint-disable no-useless-catch*/

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
const createNew = async (reqBody) => {
    try {
        // Xử lí logic dữ liệu tùy đặc thù dự án
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody?.title)
        }

        // Gọi tới tầng model để xử lí lưu bản ghi newBoard vào Database
        const createdBoard = await boardModel.createNew(newBoard)

        // Lấy bản ghi board sau khi gọi
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

        // Trả về dữ liệu cho tầng controller
        return getNewBoard
    } catch (error) {
        throw error
    }
}

const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId)
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
        }

        const resBoard = cloneDeep(board)

        // dua card ve dung column cua no

        resBoard.columns.forEach(column => {
            column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
        })

        delete resBoard.cards
        return resBoard
    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew,
    getDetails
}