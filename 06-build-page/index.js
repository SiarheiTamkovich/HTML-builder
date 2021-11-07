const fs = require('fs');
const path = require('path');
const folderStyle = `06-build-page/styles`;
const folderHtml = `06-build-page/components`;
const folderDist = `06-build-page/project-dist`;

let arrStyle = [];
let arrHtml = [];
let content = ``;

fs.access(folderDist, fs.constants.F_OK, (err) => {
    if (err) {
        console.log(`Папка ${folderDist} создана`);
        fs.mkdir(folderDist, { recursive: true }, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
})

fs.access(`${folderDist}/index.html`, fs.constants.F_OK, (err) => {
    if (err) {
        fs.writeFile(`${folderDist}/index.html`, content, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Файл ${folderDist}/index.html успешно создан`);
        })
    }
});

setTimeout( () => {
        fs.copyFile(`06-build-page/template.html`, `${folderDist}/index.html`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Файл index.html успешно скопирован');
        });
    },
  100
)
       
fs.readFile(`06-build-page/template.html`, `utf-8`, (err, data) => {
    if (err) {
    console.error(err)
    return
    }
    content = data;
});

fs.readdir(folderHtml, (err, files) => {
//     console.error(err)
    files.forEach(file => {
        let name = file.replace(/.html/g, ``);
 //     console.log(name);
        if (name === `articles`) {
            fs.readFile(`${folderHtml}/articles.html`, `utf-8`, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                content = content.replace(/{{articles}}/g, data);
            })
        } else if (name === `footer`) {
            fs.readFile(`${folderHtml}/footer.html`, `utf-8`, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                content = content.replace(/{{footer}}/g, data);
            })
        } else if (name === `header`) {
            fs.readFile(`${folderHtml}/header.html`, `utf-8`, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                content = content.replace(/{{header}}/g, data);
            })
        } else if (name === `about`) {
            fs.readFile(`${folderHtml}/about.html`, `utf-8`, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                content = content.replace(/{{about}}/g, data);
            })
        }
    });
});

setTimeout( () => {
//   console.log(content);
        fs.writeFile(`${folderDist}/index.html`, content, (err) => {
        if (err) {
            console.error(err)
            return
            }
            console.log('файл index.html успешно перезаписан')
        })
    },
  1000
)

fs.readdir(folderStyle, (err, files) => {
//     console.error(err)
       files.forEach(file => {
           let re = /^(?:.*\.(?=(htm|html|css|js)$))?[^.]*$/i
           let ext = file.replace().match(re);
           if (ext) {
               fs.readFile(`${folderStyle}/${file}`, `utf-8`, (err, data) => {
                   if (err) {
                     console.error(err)
                     return
                   }
   //                writeFile(data)
                   arrStyle.push(data);
    //               console.log(`content = ${content}`)
               })
               console.log(`Файл ${file} прочитан`)
           } 
       });
});

setTimeout( () => {
    let content = arrStyle.join(`\n\n`);
    writeStyle(content);
    },
  2000
)

function writeStyle(content){
    fs.access(`${folderDist}/style.css`, fs.constants.F_OK, (err) => {
        if (err) {
 //           console.log(`Файл ${folderDist}/bundle.css не существует, создаю...`);
                    
            fs.writeFile(`${folderDist}/style.css`, content, (err) => {
                if (err) {
                console.error(err)
                return
                }
                console.log(`Файл ${folderDist}/style.css успешно перезаписан`)
            })
        
        } else {
            fs.unlink(`${folderDist}/style.css`, (err) => {
                if (err) throw err;
     //           console.log('Файл успешно удален');
            });
            fs.writeFile(`${folderDist}/style.css`, content, (err) => {
                if (err) {
                console.error(err)
                return
                }
                console.log(`Файл ${folderDist}/style.css успешно перезаписан`)
            })
        }
    });
}

createDir(folderDist, `assets`);
createDir(`${folderDist}/assets`, `fonts`);
createDir(`${folderDist}/assets`, `img`);
createDir(`${folderDist}/assets`, `svg`);
function createDir(dist, folderName){
    fs.access(`${dist}/${folderName}`, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`Файл ${dist}/${folderName} не существует, создаю...`);
            newDir(`${dist}/${folderName}`);
        }
    });
}
async function newDir(folder){
    await fs.promises.mkdir(folder, { recursive: true });
//   console.log(`Папка "files-copy" успешно создана`);
}

copyDir(`06-build-page/assets/fonts`, `${folderDist}/assets/fonts`);
copyDir(`06-build-page/assets/img`, `${folderDist}/assets/img`);
copyDir(`06-build-page/assets/svg`, `${folderDist}/assets/svg`);
function copyDir(folder, folderNew){
    fs.readdir(folder, (err, files) => {
 //       console.log(err)
          files.forEach(file => {
 //           console.log(file);           
            fs.copyFile(`${folder}/${file}`, `${folderNew}/${file}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log(`Файл ${file} успешно cкопирован в ${folderNew}`)
            });
        });
    })
}

 