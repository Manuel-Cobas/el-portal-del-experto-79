const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(">>> DB is Connected");
      console.log(`>>> Server On Port ${app.get('port')}`);
    })
  })