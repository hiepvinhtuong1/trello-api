/* eslint-disable indent */
/* eslint-disable no-useless-catch*/

import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
    try {
        // Xử lí logic dữ liệu tùy đặc thù dự án
        const newColumn = {
            ...reqBody
        }

        const createdColumn = await columnModel.createNew(newColumn)

        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

        if (getNewColumn) {
            getNewColumn.cards = []

            //Cập nhật lại mảng columnOrderIds trong board
            await boardModel.pushColumnOrderIds(getNewColumn)
        }

        return getNewColumn
    } catch (error) {
        throw error
    }
}

const update = async (columnId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updateAt: Date.now()
        }
        const updatedColumn = await columnModel.update(columnId, updateData)
        return updatedColumn
    } catch (error) {
        throw error
    }
}


export const columnService = {
    createNew,
    update
}