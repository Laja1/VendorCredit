// index.ts

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middleware';
import routes from './routes';
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://exp://192.168.1.2:8081",
      "http://exp://192.168.1.3:8081",
      'http://exp://192.168.1.6:8081',
      '*'
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Routes
app.use('/api', routes);


const uri = process.env.DATABASE_NAME!

console.log(uri)

// MongoDB connection
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)

//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// Start server
app.listen(PORT, () => {
//   run().catch(console.dir);
  console.log(`Server is running on port ${PORT}`);
});