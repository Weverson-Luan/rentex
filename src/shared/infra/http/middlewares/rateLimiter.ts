import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";


//create one client-redis
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requests to allow
  duration: 5, // per 5 second by IP
});



//create middleware
export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
):Promise<void>{
  try {
    // consume ip
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError("To many request", 429);
  };
};