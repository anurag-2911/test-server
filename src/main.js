
var express = require('express');
var app = express();

app.get('/',(req,res)=>homePage(req,res));

function homePage(request,response){
    // console.log(request);
    response.send('hello world!');
}

var server = app.listen(443,function(){
   var host = server.address().address;
   var port = server.address().port;   
   console.log("Example app listening at http://%s:%s", host, port);
})

app.get('/zenworks-content/upload/file',(request,response)=>uploadFile(request,response));

function uploadFile(request,response){
    
    response.send('hello from upload file');
}
