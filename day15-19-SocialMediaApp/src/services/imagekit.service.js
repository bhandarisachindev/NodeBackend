const ImageKit = require("imagekit");
require("dotenv").config() ;
const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

async function imageUpload(file,filename){
  const response= imagekit.upload({
    file:file,fileName:filename,folder:"/social"
  });
  return response;
}


module.exports=imageUpload;