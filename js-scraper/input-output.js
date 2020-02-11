const fs = require('fs');

var read = function(title) {
    var data;
    try {
        data = fs.readFileSync(`records/${title}.txt`, 'UTF8');  
    }
    catch (err) {
        console.log("No local content")
    }
    return data;
}

var write = function(title, price) {
    fs.writeFile(`records/${title}.txt`, price, function(err) {
        if (err) throw err;
        console.log('saved!');
    });
}
//
module.exports = {
    read: read,
    write: write
};