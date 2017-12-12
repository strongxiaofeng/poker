var fs = require('fs');
var path = require('path');
var	uglify = require('uglify-js');
var files = fs.readdirSync('./files');
console.log(files);
var code = {
};
// files.forEach(function (file) {
//     code[file] = fs.readFileSync('./files/' + file, 'utf8');
// });
var result = uglify.minify(code);
//fs.writeFile('./lib.js', result.code, 'utf8');
function mkdirsSync(dirname) {
    console.log(path.dirname(dirname));
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}