mongoose = require("mongoose");
const DB_CONNECT_URL =
  "mongodb://annaBul:anna2411@ds133004.mlab.com:33004/croweding";

mongoose.connect(DB_CONNECT_URL, {
  useMongoClient: true
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));  

db.once('open', function(){

})