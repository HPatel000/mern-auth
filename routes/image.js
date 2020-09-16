const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURI');
const Grid = require('gridfs-stream');

conn = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

let gfs;
conn.once('open', async () => {
  gfs = await Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// @route GET api/image/:filename
// @desc get user image
// @access private
router.get('/:filename', async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'No file exists'
      });
    }
  });
});

module.exports = router;