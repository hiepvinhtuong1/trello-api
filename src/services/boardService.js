/* eslint-disable indent */
/* eslint-disable no-useless-catch*/

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
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
            column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
        })

        delete resBoard.cards
        return resBoard
    } catch (error) {
        throw error
    }
}

const update = async (boardId, reqBody) => {
    try {

        const updatedColumnOrderIds = reqBody?.columnOrderIds.map(columnId => new ObjectId(columnId))

        const updateData = {
            ...reqBody,
            updateAt: Date.now()
        }
        updateData.columnOrderIds = updatedColumnOrderIds
        const updatedBoard = await boardModel.update(boardId, updateData)
        return updatedBoard
    } catch (error) {
        throw error
    }
}

const moveCardToDifferentColumn = async (reqBody) => {
    try {
        // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu đơn giản là xóa thằng card ra khỏi column đó)
        await columnModel.update(reqBody?.prevColumnId, {
            cardOrderIds: reqBody?.prevCardOrderIds,
            updateAt: Date.now()
        })

        // B2: Cập nhật mảng cardOrderIds của Column tiếp theo chưa nó (Hiểu đơn giản là thêm card vào column đó)
        await columnModel.update(reqBody?.nextColumnId, {
            cardOrderIds: reqBody?.nextCardOrderIds,
            updateAt: Date.now()
        })

        // B3: Cập nhật lại columnId của thằng card
        await cardModel.update(reqBody?.currentCardId, {
            columnId: reqBody?.nextColumnId
        })
        return { updateResult: 'success' }
    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew,
    getDetails,
    update,
    moveCardToDifferentColumn
}