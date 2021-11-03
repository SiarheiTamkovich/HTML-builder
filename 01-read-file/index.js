const fs = require('fs');

let stream = fs.createReadStream('01-read-file/text.txt')

setTimeout( () =>
    stream.on('data', (data) =>
      console.log(data.toString())
    ),
  100
)