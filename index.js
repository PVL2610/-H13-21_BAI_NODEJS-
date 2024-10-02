const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'my-data');
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const fileNames = [
  'Gooup1_User_Tracking_121220230405.txt',
  'Gooup1_User_Tracking_290220230405.txt',
  'Gooup1_User_Tracking_29022023040506.txt',
  'Gooup1_User_Tracking_290220230450.txt',
  'Gooup1_User_Tracking_290220234050.txt',
  'Gooup1_User_Tracking_290220234050.txt',
  'Gooup1_User_Tracking_290020232323.txt',
  'Gooup1_UserTracking_290020232323.txt',
  'Gooup1_User_Tracking_291220232323.txts',
];


fileNames.forEach(fileName => {
    const filePath = path.join(dirPath, fileName);
    fs.writeFileSync(filePath, ""); 
});

function isValidDateTime(dateStr) {
    const day = parseInt(dateStr.substring(0, 2), 10);    // DD
    const month = parseInt(dateStr.substring(2, 4), 10);  // MM
    const year = parseInt(dateStr.substring(4, 8), 10);   // YYYY
    const hour = parseInt(dateStr.substring(8, 10), 10);  // HH
    const minute = parseInt(dateStr.substring(10, 12), 10); // MM

    if (month < 1 || month > 12) return false;
    const daysInMonth = [31, (((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return false;
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;
    return true;
}

function isValidFileName(fileName) {
    const regex = /^Gooup1_User_Tracking_(\d{12})\.txt$/;
    const match = fileName.match(regex);

    if (match) {
        const dateTimeStr = match[1];
        return isValidDateTime(dateTimeStr);
    }

    return false;
}


fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    files.forEach(fileName => {
        const filePath = path.join(dirPath, fileName);
        if (isValidFileName(fileName)) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;
                const newData = data ? data + '-OK' : '-OK';
                fs.writeFile(filePath, newData, err => {
                    if (err) throw err;
                    console.log(`Đã cập nhật file: ${fileName}`);
                });
            });
        } else {
            console.log(`File không hợp lệ: ${fileName}`);
        }
    });
});
