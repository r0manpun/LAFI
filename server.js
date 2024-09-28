const { default: mongoose } = require("mongoose");
const app = require("./app");

const DB =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/lost-and-found-items';

mongoose.connect(DB).then(() => {
  console.log('DB connected successfully!!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('app listening to port ' + port);
});
