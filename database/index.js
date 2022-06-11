const Sequelize = require("sequelize");
const mssql = require("mssql");
const dbconfig1 = require("../config/db.config");
// const sqlConfig = {
//   user: dbconfig1.USER,
//   password: dbconfig1.PASSWORD,
//   database: dbconfig1.DB,
//   server: dbconfig1.HOST,
// };
const sequelize = new Sequelize(
  dbconfig1.DB,
  dbconfig1.USER,
  dbconfig1.PASSWORD,
  {
    dialect: "mssql",
    host: dbconfig1.HOST,
    dialectOptions: {
      encrypt: true,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection has been established successfully. --- connected to HR"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const config = require("../config/db2.config");
//const Sequelize = require("sequelize");
const sequelize2 = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: true,
  port: config.PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
(async () => {
  try {
    await sequelize2.authenticate();
    console.log(
      "Connection has been established successfully. --- connected to Payroll"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// sequelize
//   .authenticate()
//   .then((err) => {
//     console.log("Connection successful", err);
//   })
//   .catch((err) => {
//     console.log("Unable to connect to database", err);
//   });

const db = {};
db.nhanvien = require("./human/models/nhanvien.model")(sequelize2, Sequelize);
db.phongban = require("./human/models/phongban.model")(sequelize2, Sequelize);
db.luong = require("./payroll/models/luong.model.js")(sequelize, Sequelize);
db.osin = require("./payroll/models/osin.model.js")(sequelize, Sequelize);
db.phongban.hasMany(db.nhanvien, {
  foreign: "mapb",
});
// db.nhanvien.hasMany(db.luong, {
//   foreign: "manv",
// });

//db.mssql = mssql.connect(sqlconfig);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize2 = sequelize2;
module.exports = db;
