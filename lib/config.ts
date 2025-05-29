export const config = {
    env: {
        apiEndpoint : process.env.NEXT_PUBLIC_API_ENTPOINT,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT,
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
            qstashToken: "eyJVc2VySUQiOiI0YmUzZTE5ZC0xMjY2LTQ4ZjctOWIzNy1lYjc3ZTM4ODkyNTQiLCJQYXNzd29yZCI6IjUzOWZhOWE0YmUzYTQzODJiOWZhNjNkNWRhMWZhOTFhIn0="
        }
    }
}

export default config