import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://mark:EWTxehiD24b5hWH7@cluster0.uvfxv.mongodb.net/auth-demo?retryWrites=true&w=majority'
    );
    return client;
  } catch (error) {
    throw error;
  }
}
