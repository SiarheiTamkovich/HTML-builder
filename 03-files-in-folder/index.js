const fs = require('fs')
const path = require('path')
const folderPath = '03-files-in-folder/secret-folder'

console.log(`\n` + folderPath + `:\n`)

fs.readdir(folderPath, (err, files) => {
    files.forEach(file => {
        fs.stat(`${folderPath}/${file}`, (err, stats) => {
            if (stats.isFile()) {
                console.log(file + ` - ` + stats[`size`] / 1000 + `kb`);
            }
        });     
    });
})



