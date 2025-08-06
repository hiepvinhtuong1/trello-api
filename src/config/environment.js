/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import 'dotenv/config.js'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || '',
  DATABASE_NAME: process.env.DATABASENAME || 'trello-database',
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || 8017,

  BUILD_MODE: process.env.BUILD_MODE || 'dev', // dev | production

  AUTHOR: process.env.AUTHOR || 'TUANHIEPDEV'
}