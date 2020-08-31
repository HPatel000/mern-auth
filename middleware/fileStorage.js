const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: './client/public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: storage
}).single('img');

module.exports = upload;