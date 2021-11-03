const fs = require("fs");

let writeableStream = fs.createWriteStream("02-write-file/text.txt");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

read();
function read(){
    readline.question(`\nВведите текст (или "exit" для выхода): `, (text) => {
   
        if (text === `exit`) {
            console.log(`\nКонец ввода. Данные сохранены в файле text.txt`);
            readline.close();
        } else {
            console.log(`\nTекст: "${text}" сохранен`);
            writeableStream.write(`${text} \n`);
            read();
        }
    });
}

let readableStream = fs.createReadStream("02-write-file/text.txt", "utf8");
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});