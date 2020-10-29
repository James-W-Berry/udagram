import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
    let result;

    let filterPromise = new Promise( async (resolve, reject) => {
        try{
            const photo = await Jimp.read(inputURL);
        await photo
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        })
        } catch{
            resolve("failed applying filter to image")
        }
        
    }).catch(()=>{console.log("failed applying filter to image")})

    result = await filterPromise.then((value)=>{
        if(value === "failed applying filter to image"){
            return "failed applying filter to image"
        } else {
            return __dirname+outpath
        }
    })

    return result
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}