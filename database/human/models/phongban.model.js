module.exports = (sequelize, Sequelize) => {
  const PhongBan = sequelize.define("phongban", {
    mapb: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    tenphongban: {
      type: Sequelize.STRING,
    },
  });
  return PhongBan;
};
