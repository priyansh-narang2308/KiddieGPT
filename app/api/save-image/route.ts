import { storage } from "@/config/firebase-config"
import axios from "axios"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const data = await req.json()
    const { url } = data

    const base64Image:any = await convertImage(url)

    const fileName = "/ai-story/" + Date.now() + ".png"
    const imageRef = ref(storage, fileName)

    await uploadString(imageRef, base64Image, "base64").then((snapshot) => {
        console.log("File Uploaded")
    })

    const downloadedUrl = await getDownloadURL(imageRef)
    console.log(downloadedUrl)

    return NextResponse.json({ imageUrl: downloadedUrl })
}

const convertImage = async (imageUrl: string) => {
    try {
        const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(res.data).toString("base64"); 
    } catch (error) {
        console.log("Error converting image: ", error);
        return ""; 
    }
};
