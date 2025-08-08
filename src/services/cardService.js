/* eslint-disable indent */
/* eslint-disable no-useless-catch*/

import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
    try {
        // Xử lí logic dữ liệu tùy đặc thù dự án
        const newCard = {
            ...reqBody
        }

        const createdCard = await cardModel.createNew(newCard)

        const getNewCard = await cardModel.findOneById(createdCard.insertedId)


        if (getNewCard) {
            //Cập nhật lại mảng cardOrderIds trong board
            await columnModel.pushCardOrderIds(getNewCard)
        }

        return getNewCard
    } catch (error) {
        throw error
    }
}


export const cardService = {
    createNew
}