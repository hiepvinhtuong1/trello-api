/* eslint-disable no-console */

import express from 'express'
import {CONNECT_DB, GET_DB} from './config/mongodb.js'

const START_SEVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
  })
  app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
    console.log(`Hello Trung Quan Dev, I am running at ${ hostname }:${ port }/`)
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
