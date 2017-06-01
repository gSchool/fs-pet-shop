let fs = require("fs");
const FILEPATH = "pets.json";

let cmd = process.argv[2];

let data = fs.readFileSync(FILEPATH, 'utf8');
let obj = JSON.parse(data);

let options = {
    read: function(){
        if(process.argv[3] === undefined){
            console.log(obj);
        } else {
            if(process.argv[3] >= obj.length || process.argv[3] < 0){
                console.error("Usage: node pets.js read INDEX\n");
                process.exit(1);
            } else {
                console.log(obj[process.argv[3]]);
            }
        }
    },

    create: function(){
        if(process.argv.length != 6){
            console.error("Usage: node pets.js create AGE KIND NAME");
            process.exit(1);
        } else {
            if(isNaN(Number(process.argv[3]))){
                console.error("Usage: node pets.js create AGE KIND NAME");
                process.exit(1);
            } else {
                let pet = {"age": Number(process.argv[3]), "kind": process.argv[4], "name": process.argv[5]};
                obj.push(pet);
                fs.writeFileSync(FILEPATH,JSON.stringify(obj));
                console.log(pet);
            }



        }



    },

    update: function(){

    },

    destroy: function(){

    },

};

try {
    options[cmd]();
} catch (error){
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}
