var fs = require('fs');
fs.stat(


// Create a file descriptor.
fs.open('/etc/passwd', 'r', function(err, fd){

  // Read the file's entire contents with nothing more than the file descriptor
  fs.fstat(fd, function(err, stats){
    if (err) {
      throw err;
    }
    var buf = new Buffer(stats.size)
    , start
    , position;

    // The fs.read() API documented at http://nodejs.org/api.html#fs-read-142
    fs.read(fd, buf, start, stats.size, position, function(err, bytesRead){
      if (err) {
        throw err;
      }
      console.log(buf.toString('utf-8'));
      console.log("bytesRead: " + bytesRead.toString());
    })

    position = 0; // Start reading from the beginning of the file again

    // A different fs.read() signature. Not documented on http://nodejs.org/api.html
    // But used in https://github.com/christkv/node-mongodb-native/blob/master/lib/mongodb/gridfs/gridstore.js#L189
    fs.read(fd, stats.size, position, 'utf-8', function(err, data, bytesRead){
      if (err) {
        throw err;
      }
      console.log(data);
      console.log("bytesRead: " + bytesRead.toString());
    })
  })
});