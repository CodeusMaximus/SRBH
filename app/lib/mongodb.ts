import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb';

// Skip MongoDB during build time
const skipMongoDB = process.env.SKIP_MONGODB_DURING_BUILD === 'true';

// Define types
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Properly declare the global variable
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Create fake client for build time
if (skipMongoDB) {
  const fakeClient = {} as unknown as MongoClient;
  clientPromise = Promise.resolve(fakeClient);
} else {
  // Real MongoDB connection for runtime
  const uri = process.env.DATABASE_URI;
  
  if (!uri) {
    throw new Error('Please define the DATABASE_URI environment variable');
  }
  
  const options: MongoClientOptions = {};

  if (process.env.NODE_ENV === 'development') {
    // In development, use global variable
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Helper for ObjectId
export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

// Connect and return db/client
export async function connectToDatabase() {
  if (!process.env.DATABASE_URI && !skipMongoDB) {
    throw new Error('MongoDB connection error: DATABASE_URI environment variable is missing. Please add it to your .env file or deployment environment.');
  }
  
  const client = await clientPromise;
  const db = client.db("MediDari");
  return { client, db };
}

export default clientPromise;