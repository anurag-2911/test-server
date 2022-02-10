
const express = require("express");
const bodyParser = require("body-parser");
const { processFileUploadStream } = require("./processFileUploadStream");
const fs = require('fs');
const app = express();

app.use(bodyParser.raw({limit: '8mb'})); 

var server1 = app.listen(443,() =>{
   var host = server1.address().address;
   var port = server1.address().port;   
   console.log("webserver started and listening at http://%s:%s", host, port);
});

var server2 = app.listen(453,() =>{
    var host = server2.address().address;
    var port = server2.address().port;   
    console.log("webserver started and listening at http://%s:%s", host, port);
 });
 

app.post('/zenworks-content/upload/file',(request,response)=>{
    console.log('received a request on /zenworks-content/upload/file')
    var data = request.body.toString();
   
    var fileName = request.query.fileName;
    var fileType = request.query.fileType;
    var totalChunks = request.query.totalChunks;
    var currentChunk = request.query.currentChunk;
    var lastModifiedTime = request.query.lastModifiedTime;
    var overwrite = request.query.overwrite;

    processFileUploadStream(data,fileName,fileType,totalChunks,currentChunk,
                    lastModifiedTime,overwrite,response);

    response.status(200).json({ message: "File upload completed ", status: 200 });
});

// Global error handler - route handlers/middlewares which throw end up here
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log('global error handler called ' + Date.now());
    res.end();
});


