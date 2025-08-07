/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors.js'
import existHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb.js'
import { env } from './config/environment.js'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware.js'

const START_SEVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)


  //Midleware xử lý lỗi tập chung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_HOST}/`)
  })


  // Thực hiện các tác vụ cleanup trước khi dừng server
  existHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB')
  })
}

// Chỉ khi kết nối thành công tới MongoDB thì mới khởi động server
// Immediately Invoked Function Expression (IIFE) to handle async/await at the top level
(async () => {
  try {
    console.log('Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('Conected to MongoDB successfully')
    START_SEVER()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // Exit the process with a failure code
  }
})()

// CONNECT_DB()
//   .then(() => {
//     console.log('Conected to MongoDB successfully')
//   })
//   .then(() => START_SEVER())
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error)
//     process.exit(1) // Exit the process with a failure code
//   })
