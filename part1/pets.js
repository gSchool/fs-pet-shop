// import fs from 'fs'

// const subcommand = process.argv[2];

// switch (subcommand) {
//     case 'read':
//         {
//             fs.readFile('./pets.json', 'utf-8', (err, str) => {
//                 const data = JSON.parse(str);
//                 console.log(data);
//             })
//         }
//         // case 'create'
//         // case 'update'
//         // case 'destroy'
//     default:
//         {
//             console.error("Usage: node pets.js [read | create | update | destroy]")
//         }
// }