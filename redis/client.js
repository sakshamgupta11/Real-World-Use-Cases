import { Redis } from 'ioredis';
import dotenv from 'dotenv'
dotenv.config()

const client = new Redis({
  host: process.env.HOSTR,
  port: process.env.PORTRE,
  db: 0 
});

export default client;
