
const fs = require('fs');

const returnDataFiles = (file) => {
    let data = fs.readFileSync(`./bd/${file}.json`);
    return JSON.parse(data);
}

const writeDataFiles = (file, data) => {
    return new Promise(function (resolve, reject) {
        fs.writeFileSync(`./bd/${file}.json`, data, (error) => {
            if(error){
                reject(error);
            }else{
                resolve({data: 'Succesfully'});
            }
        })
    })
}

const returnLastId = (file) => {
    try {
        const data = returnDataFiles(file);
        let reverseData = data[file].reverse();
        return (Number(reverseData[0].id) + 1).toString();
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    returnDataFiles,
    writeDataFiles,
    returnLastId
}