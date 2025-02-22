import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDB() {
  if (cachedClient) {
    return { client: cachedClient };
  }

  const client = await mongoose.connect(MONGODB_URI);

  cachedClient = client;
  return { client };
}
