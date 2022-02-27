const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect("mongodb://localhost:27017/portal-experto-blog")
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(">>> DB is Connected");
      console.log(`>>> Server On Port ${app.get('port')}`);
    })
  })