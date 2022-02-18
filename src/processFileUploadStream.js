
// file to process post request

function processFileUploadStream(data, fileName, fileType, totalChunks, currentChunk,
    lastModifiedTime, overwrite, response) {

    const fs = require('fs');
    {
        if (fs.existsSync(fileName)) {
           
            if (overwrite == true) {
                console.log(fileName + ' file already present and overwrite is true so deleting it ');
                fs.unlinkSync(fileName);
            }

            
            else if(currentChunk==1){
                console.log('file already present and overwrite is false so returning');
                response.status(400).json({ message: "File Already Exists!", status: 400 });

            }
        }
    }
    console.log('file name ' + fileName + ' fileType ' + fileType +
        ' totalchunks ' + totalChunks + ' currentChunk ' + currentChunk +
        ' lastmodifiedTime ' + lastModifiedTime + ' overwrite ' + overwrite);

    var logStream = fs.createWriteStream(fileName, { flags: 'a' });
    logStream.write(data);
    logStream.end();


}
exports.processFileUploadStream = processFileUploadStream;
