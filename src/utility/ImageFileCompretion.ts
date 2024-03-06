import imageCompression from "browser-image-compression";

export default async function ImageFileCompretion(imageMetaData: File) {
  try {
    //conver image size in kB
    const imageSize = Math.round(imageMetaData.size / 1024);

    // more than 1.5Mb not allow
    if (imageSize > 1536) {
      console.log("more than 1.5MB is not allow");
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // file comression
    const compressedFile = await imageCompression(imageMetaData, options);
    return compressedFile;
  } catch (err) {
    console.error(err);
  }
}
