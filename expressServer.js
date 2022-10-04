const express = require('express');
const app = express();
let fs = require('fs');
app.use(express.json());
const PORT = process.env.PORT || 8000;

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


app.post('/pets', function(req, res) {
    console.log(req.body)
    let newData = req.body
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error){
            console.error(new Error('Whoops, something bad happened'))
        } else {
            let petData = JSON.parse(data)
            petData.push(newData)
            let newJson = JSON.stringify(petData)
        fs.writeFile('pets.json', newJson, error => {
        if(error) {
            console.log('Error writing file', error)
        } else {
            console.log(`Successfully added!`)
        }
        })
        }
})
})

app.listen(port, function() {
    console.log('Server is running', PORT);
});