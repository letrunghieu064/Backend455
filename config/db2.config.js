module.exports = {
  HOST: "localhost",
  USER: "sinhvien",
  PASSWORD: "060401",
  DB: "human",
  PORT: "3305",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
