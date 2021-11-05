const fs = require('fs');
const path = require('path');
const folderPath = `05-merge-styles/styles`;
const folderDist = `05-merge-styles/project-dist`;

let arrFiles = [];
let content = ``;

fs.readdir(folderPath, (err, files) => {
 //   console.error(err)
//  console.log(files)
    files.forEach(file => {
        let re = /^(?:.*\.(?=(htm|html|css|js)$))?[^.]*$/i
        let ext = file.replace().match(re);
        if (ext) {
            fs.readFile(`${folderPath}/${file}`, `utf-8`, (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
//                writeFile(data)
                arrFiles.push(data);
 //               console.log(`content = ${content}`)
            })
            console.log(`Файл ${file} прочитан`)
        } 
    });
});

setTimeout( () => {
    let content = arrFiles.join(`\n`);
//    console.log(content);
//    console.log(arrFiles)
    writeFile(content);
    },
  1000
)


function writeFile(content){
    fs.access(`${folderDist}/bundle.css`, fs.constants.F_OK, (err) => {
        if (err) {
 //           console.log(`Файл ${folderDist}/bundle.css не существует, создаю...`);
                    
            fs.writeFile(`${folderDist}/bundle.css`, content, (err) => {
                if (err) {
                console.error(err)
                return
                }
                console.log(`Файл ${folderDist}/bundle.css успешно перезаписан`)
            })
        
        } else {
            fs.unlink(`${folderDist}/bundle.css`, (err) => {
                if (err) throw err;
     //           console.log('Файл успешно удален');
            });
            fs.writeFile(`${folderDist}/bundle.css`, content, (err) => {
                if (err) {
                console.error(err)
                return
                }
                console.log(`Файл ${folderDist}/bundle.css успешно перезаписан`)
            })
        
        }
    });
}
