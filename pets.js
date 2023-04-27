#!/usr/bin/env node

import { ADDRCONFIG } from 'dns';
import { readFile,writeFile  } from 'fs';
import { exit } from 'process';

if (process.argv.length < 3) {
    console.error('Usage: node pets.js [read | create | update | destroy]');
   exit(1);
    
  }
  const command = process.argv[2];

  if (command === 'read') {
    readFile('pets.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      const pets = JSON.parse(data);
  
      if (process.argv.length === 3) {
        console.log(pets);
      } else if (process.argv.length === 4) {
        const index = parseInt(process.argv[3]);
        if (isNaN(index)) {
            readFile('pets.json', 'utf8', (err, data) => {
              if (err) throw err;
              const pets = JSON.parse(data);
              console.log(pets);
            });
          } else {
            readFile('pets.json', 'utf8', (err, data) => {
              if (err) throw err;
              const pets = JSON.parse(data);
              if (index < 0 || index >= pets.length) {
                console.error(`Error: Index ${index} out of bounds`);
                exit(1);
              } else {
                console.log(pets[index]);
              }
            });
          }
      } else {
        console.error('Usage: node pets.js read [index]');
       exit(1);
      }
    });
  } 
  else if (command === 'create') {
    if (process.argv.length !== 6) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      exit(1);
    }
    let age = parseInt(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];
    if(isNaN(age)) { age = "Not a valid age"}
    readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err;
    
        const pets = JSON.parse(data);
        const newPet = { age, kind, name };
        pets.push(newPet);
    
        writeFile('pets.json', JSON.stringify(pets), (err) => {
          if (err) throw err;
    
          console.log(newPet);
        });
      });
    } 
    else if(command === 'update') {
        if(process.argv.length !==7) {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME')
            exit(1)
        }
        const index = parseInt(process.argv[3]);
        const age = parseInt(process.argv[4]);
        const kind = process.argv[5];
        const name = process.argv[6];
        
        readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err;
        
            const pets = JSON.parse(data);
            if (index < 0 || index >= pets.length) {
              console.error(`Error: Index ${index} out of bounds`);
              exit(1);
            } else {
              const updatedPet = { age, kind, name };
              pets[index] = updatedPet;
              writeFile('pets.json', JSON.stringify(pets), (err) => {
                if (err) throw err;
        
                console.log(updatedPet);
              });
            }
          });
        } else {
          console.error('Usage: node pets.js [read | create | update | destroy]');
          exit(1);
        }