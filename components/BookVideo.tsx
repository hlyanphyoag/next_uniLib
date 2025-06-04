'use client'
import React from 'react'
import {IKVideo, ImageKitProvider} from "imagekitio-next";

const BookVideo = ({videoUrl}: {videoUrl: string}) => {
    return (
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL} publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}>
            <IKVideo path={videoUrl} controls={true} className='w-full rounded-xl'/>
        </ImageKitProvider>
    )
}
export default BookVideo
