const config = {
    env: {
        apiEndpoint : process.env.NEXT_PUBLIC_API_ENTPOINT,
        imagekit: {
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            privateKey : process.env.IMAGEKIT_PRIVATE_KEY!
        },
        databaseUrl : process.env.NEXT_PUBLIC_DATABASE_URL,
    }
}

export default config