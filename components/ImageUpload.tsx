'use client'
import config from "@/lib/config";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";

import React, { useRef, useState } from 'react'
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

const {env:{imagekit  : {publicKey, privateKey, urlEndpoint}} }= config;

const authenticator = async() => {  
    
    try{
        const res  = await fetch(`${config.env.apiEndpoint}api/auth/imagekit`);
        if(!res.ok) {
            const errorText = await res.text();
            throw new Error(`Request failed with status ${res.status} : ${errorText}`)
        }
        const data = await res.json();
        console.log('imagekit:',data)
        const { signature, expire, token } = data;
        return { signature, expire, token }
    }catch(error) {
        console.log(error)
    }
}

const ImageUpload = ({onFileChange} : {onFileChange : (filePath : string) => void })  => {
    const ikUploader = useRef(null);
    const [ file, setFile ] = useState< {filePath : string } | null > (null) ;
   

    const onError = (error: any) => {
        console.log(error.message)
        toast('Your image could not be uploaded. Please try again')
    }
    const onSuccess = (res: any) => {
        console.log("File Path " ,res.filePath)
        setFile(res)
        onFileChange(res.filePath)
        console.log(res)
        toast('Image upload successfully')
    }
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <IKUpload
            className="hidden" 
            ref={ikUploader}
            onError={onError}
            onSuccess={onSuccess}
            fileName="test-upload.png"
        />
       <button className="upload-btn" 
            onClick = {(e) => {
                e.preventDefault();
                if(ikUploader.current) {
                    // @ts-ignore
                    ikUploader.current?.click()
                }
            }}
       >
        
        
            <Image src='/icons/upload.svg'
          
            width={24}
            height={24}
            alt = 'upload icon'
            className="object-contain"
            />
            <p className="text-light-100 text-base">Upload a file</p>

            {file && <p className="upload-filename">{file.filePath}</p>}
       </button>
            
       {file && 
       
        <IKImage 
            path={file.filePath}
            alt = {file.filePath}
            width={500}
            height={300}
        />
       }
    </ImageKitProvider>
  )
}

export default ImageUpload