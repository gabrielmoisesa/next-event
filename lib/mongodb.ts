import mongoose, { type Mongoose } from 'mongoose';

// Keep a cached connection in development so Next.js hot reload doesn't create
// a new MongoDB connection on every change.
declare global {
  var mongoConnectionCache:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Reuse the cached connection across requests in development and during module
// re-evaluation. If there is no cached instance, create one.
const cached = (globalThis.mongoConnectionCache ??= {
  conn: null,
  promise: null,
});

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoConnection) => mongoConnection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
