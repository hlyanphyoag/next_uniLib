export const config = {
    env: {
        apiEndpoint : process.env.NEXT_PUBLIC_API_ENTPOINT,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PRO_API_ENDPOINT,
        imagekit: {
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            privateKey : process.env.IMAGEKIT_PRIVATE_KEY!
        },
        databaseUrl : process.env.NEXT_PUBLIC_DATABASE_URL,
        upstash: {
            redisUrl : process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL!,
            redisToken : process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN!,
            qstashUrl: process.env.NEXT_PUBLIC_QSTASH_URL!,
            qstashToken: process.env.NEXT_PUBLIC_QSTASH_TOKEN!
        }
    }
}

export default config