
const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.raw());

var server = app.listen(443,() =>{
   var host = server.address().address;
   var port = server.address().port;   
   console.log("Example app listening at http://%s:%s", host, port);
});

app.post('/zenworks-content/upload/file',(request,response)=>{
    var data = request.body.toString();
   
    var fileName = request.query.fileName;
    var fileType = request.query.fileType;
    var totalChunks = request.query.totalChunks;
    var currentChunk = request.query.currentChunk;
    var lastModifiedTime = request.query.lastModifiedTime;
    var overwrite = request.query.overwrite;

    parseRequestData(data,fileName,fileType,totalChunks,currentChunk,lastModifiedTime,overwrite);

    response.sendStatus(200);
});

function parseRequestData(data,fileName,fileType,totalChunks,currentChunk,
    lastModifiedTime,overwrite){
        const fs = require('fs');
        if(currentChunk==1)
        {
            if(fs.existsSync(fileName))
            {
                fs.unlinkSync(fileName);
                
            }
        }

        
        var logStream = fs.createWriteStream(fileName, {flags: 'a'});
        logStream.write(data);
        logStream.end();


}



