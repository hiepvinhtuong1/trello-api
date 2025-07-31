
const MONGODB_URI =  'mongodb+srv://buituanhiepvinhtuong:goiNGu9y7wkBqL0Q@cluster0-tuanhiepdev.dthjauw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-TuanHiepDEV'

const DATABASE_NAME = 'trello-database'

import {MongoClient, ServerApiVersion}  from 'mongodb'

let trelloDatabaseInstance = null

// Khởi tạo một đối tượng Client Instance để connect  tới MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Kết nối tới Database MongoDB
export const CONNECT_DB = async () => {
// Gọi kết nối tới MongoDB Alats với URI đã được khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

// Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến  trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) 
    throw new Error('Database not connected')
  return trelloDatabaseInstance
}