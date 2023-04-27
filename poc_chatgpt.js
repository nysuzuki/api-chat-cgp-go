var express = require('express');
// var consign = require('consign');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.send('Teste');
});

app.listen(8000, function(){
    console.log("Servidor ON");
});