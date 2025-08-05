import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng Client Instance để connect  tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Kết nối tới Database MongoDB
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Alats với URI đã được khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến  trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Database not connected')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}