
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const { processFileUploadStream } = require("./processFileUploadStream");

var https = require('https');
path = require('path');
const app = express();

app.use(bodyParser.raw({limit: '8mb'})); 

try{
    var certFilePath = path.join(__dirname,'..','certificates','test01.cert');
    var privateKeyPath = path.join(__dirname,'..','certificates','test01.key');

    var certificate = fs.readFileSync(certFilePath);
    var privateKey  = fs.readFileSync(privateKeyPath);

    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443,()=>{
        console.log('https server listening on 443 ');
    });

}
catch(error){
    console.log(error);
}

try{
    var server1 = app.listen(4431,() =>{
    var host = server1.address().address;
    var port = server1.address().port;   
    console.log("http webserver started and listening at http://%s:%s", host, port);
    });

    var server2 = app.listen(4432,() =>{
        var host = server2.address().address;
        var port = server2.address().port;   
        console.log("http webserver started and listening at http://%s:%s", host, port);
    });
}
catch(error){
    console.log(error);
}
 
app.get('/',(req,res)=>{
    res.send('hello');
})

app.post('/zenworks-extcontent/upload',(request,response)=>{

    console.log('received a request on /zenworks-extcontent/upload')
   
    var data = request.body.toString();
   
    var fileName = request.query.fileName;
    const fileType = request.query.fileType;
    const totalChunks = request.query.totalChunks;
    const currentChunk = request.query.currentChunk;
    const lastModifiedTime = request.query.lastModifiedTime;
    const overwrite = request.query.overwrite;

    processFileUploadStream(data,fileName,fileType,totalChunks,currentChunk,
                    lastModifiedTime,overwrite,response);

    response.status(200).json({ responseMessage: "File upload completed ", httpResponseCode: 200 });
});

// Global error handler - route handlers/middlewares which throw end up here
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log('global error handler called ' + Date.now());
    res.end();
});





