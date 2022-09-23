const express = require('express');
const app = express();
let fs = require('fs');
const port = process.env.PORT || 8000;

app.get('/pets', function(req, res) {
        fs.readFile('pets.json', 'utf8', function(error, data){
            if(error){
                console.error(new Error('Whoops, something bad happened'))
            } 
            else{
                res.setHeader('Content-Type', 'text/plain');
                res.write(data)
                res.end()
            }
        })
})
app.get('/pets/:index', function(req, res){
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error){
            console.error(new Error('Whoops, something bad happened'))
        } else {
            let petData = JSON.parse(data)
            let petIndex = req.params['index']
            res.write(JSON.stringify(petData[petIndex]))}
            res.end();
    })
})
app.listen(port, function() {
    console.log('Server is running', port);
});