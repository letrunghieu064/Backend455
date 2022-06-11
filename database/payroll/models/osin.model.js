module.exports = (sequelize, Sequelize) => {
  const Osin = sequelize.define("osins", {
    manv2: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    ho: {
      type: Sequelize.STRING,
    },
    ten: {
      type: Sequelize.STRING,
    },
    ngaysinh: {
      type: Sequelize.STRING,
    },
  });
  return Osin;
};
