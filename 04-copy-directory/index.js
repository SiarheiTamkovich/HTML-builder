const fs = require('fs');
const path = require('path');
const folderPath = '04-copy-directory/files';
const folderNewPath = `04-copy-directory/files-copy`;

console.log(`\nИсходная папка: ` + folderPath + `\n`);

fs.access(folderNewPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.log(`Папка ${folderNewPath} не существует, создаю...`);
        newDir(folderNewPath);
        copyDir(folderPath, folderNewPath);
    } else {
        clearDir(folderNewPath);
        fs.rmdir(folderNewPath, () => { 
//            console.log('Папка успешно удалена')
        })
        newDir(folderNewPath);
        copyDir(folderPath, folderNewPath);
    }
});

async function newDir(folder){
   await fs.promises.mkdir(folder, { recursive: true });
//   console.log(`Папка "files-copy" успешно создана`);
}

function clearDir(folder){
    fs.readdir(folder, (err, files) => {
          files.forEach(file => {
            fs.unlink(`${folder}/${file}`, (err) => {
                if (err) throw err;
//                console.log(`Файл ${file} успешно удален`);
            });
        });
    })
}


function copyDir(folder, folderNew){
    fs.readdir(folder, (err, files) => {
 //       console.log(err)
 //         console.log(files);   
          files.forEach(file => {
 //           console.log(file);           
            fs.copyFile(`${folder}/${file}`, `${folderNew}/${file}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log(`Файл ${file} успешно cкопирован в папку ${folderNew}`)
            });
  
        });
    })
}