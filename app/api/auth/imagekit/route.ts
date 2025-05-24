import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {env:{imagekit  : {publicKey, privateKey, urlEndpoint}} }= config;

const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
});

export const  GET = async() => {
    return NextResponse.json(imagekit.getAuthenticationParameters())
}