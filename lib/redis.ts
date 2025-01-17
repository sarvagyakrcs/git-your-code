import Redis from "ioredis"

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("REDIS_URL not found in environment variables");
}

export const client = new Redis(getRedisUrl());