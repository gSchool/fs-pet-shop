const express = require('express')
const fs = require('fs')
const path = require('path')
const petShopApp = express()
const port = 10000
petShopApp.use(express.urlencoded({ extended: false}))
const petsPath = path.join(__dirname, 'pets.json')
petShopApp.use(express.json())


petShopApp.get('/:id', (req, res) => {
    let id = req.params.id
    if (id === 'pets/' || id === 'pets') {
        fs.readFile(petsPath, (err, data) => {
            err ? console.error(err) : res.status(200).send(JSON.parse(data))
        })
    } else {
        res.status(404).send('Not found')
    }
})


petShopApp.get('/pets/:id', (req, res) => {
    fs.readFile(petsPath, (err, data) => {
        const id = req.params.id
        const petData = JSON.parse(data)
        if (err) {
            console.error(err)
        } else if (id >= 0 && id <= petData.length - 1) {
            res.status(200).send(petData[id])
        } else {
            res.status(400).send('Bad request, try again, fool')
        }
    })
})


petShopApp.post('/pets', (req, res) => {
    fs.readFile(petsPath, (err, data) => {
        if (err) {
            console.error(err) 
        } else {
            const petData = JSON.parse(data) 
            if (typeof req.body === 'object') {
                petData.push(req.body)
                fs.writeFile(petsPath, JSON.stringify(petData), (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        res.status(200).send(petData)
                    } 
                })
            } else {
                res.status(400).send('Nice try, use an object next time')
            }
        }
    })
})

petShopApp.patch('/pets/:id', (req, res) => {
    fs.readFile(petsPath, (err, data) => {
        let petData = JSON.parse(data)
        if (err) {
            console.error(err)
        } else {
            let newPet = req.body
            let id = req.params.id
            if (newPet.age || newPet.kind || newPet.name) {
                for (let key in petData[id]) {
                    if (newPet[key]) {
                        petData[id][key] = newPet[key]
                    }
                    
                }
                fs.writeFile(petsPath, JSON.stringify(petData), (err) => {
                    err ? console.error(err) : res.status(200).send(petData)
                })
            } else {
                res.status(400).send('Bad request')
            }
        } 
    }) 
})


petShopApp.delete('/pets/:id', (req, res) => {
    fs.readFile(petsPath, (err, data) => {
        let petData = JSON.parse(data)
        if (err) {
            console.error(err) 
        } else {
            const id = req.params.id
            let formerPet = petData[id]
            petData.splice(formerPet, 1)
            fs.writeFile(petsPath, JSON.stringify(petData), (err) => {
                if (err) {
                    console.error(err)
                } else {
                    res.status(200).send('Pet is gone now.')
                }
            })
        }
    })
})

petShopApp.use((req, res) => {
    res.status(404).send('Not found')
})


petShopApp.listen(port, () => {
    console.log('Server\'s up on', port)
})