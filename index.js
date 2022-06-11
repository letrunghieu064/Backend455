const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
var sql = require("mssql");
const router = require("./routes/root");
//const Connection = require("tedious").Connection;
// config for your database
// const Sequelize = require("sequelize");

const db = require("./database/index");

// const sequelize = new Sequelize("HUMAN", "sa", "060401", {
//   dialect: "mssql",
//   host: "localhost",
//   dialectOptions: {
//     encrypt: true,
//   },
// });

// sequelize
//   .authenticate()
//   .then((err) => {
//     console.log("Connection successful", err);
//   })
//   .catch((err) => {
//     console.log("Unable to connect to database", err);
//   });
db.sequelize.authenticate();
db.sequelize2.authenticate();
//db.phongban=require("./database/human/models/phongban.model");
db.sequelize2
  .sync({
    // force: true,
  })
  .then(() => {
    console.log("Drop and Resync Db ");
    // tablenv();
    // tablepb();
  });
db.sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    console.log("Drop and Resync Db payroll");

    // tablenv();
  });
// function tablenv() {
//   db.nhanvien.create({
//     mavv
//     ho: "lee",
//     ten: "hieu",
//     ngaysinh: "6/4/2001",
//     gioitinh: 1,
//     diachi: "quang nam",
//     mapb: 1,
//   });
// }
// function tablepb() {
//   db.phongban.create({
//     mapb: 0,
//     tenphongban: "phòng kinh doanh",
//   }),
//     db.phongban.create({
//       mapb: 1,
//       tenphongban: "phòng kế toán",
//     }),
//     db.phongban.create({
//       mapb: 2,
//       tenphongban: "phòng nhân sự ",
//     });
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

// .then((err) => {
//   console.log("Connection successful", err);
// })
// .catch((err) => {
//   console.log("Unable to connect to database", err);
// });
// sql.connect(config, function (err) {
//   if (err) console.log("lỗi", err);
//   else {
//     console.log("connect");
//   }
// });
// create Request object
//connection.connect();

app.get("/", (req, res) => {
  res.send("helo");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); //http://localhost:5000
});
