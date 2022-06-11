module.exports = (sequelize, Sequelize) => {
  const Luong = sequelize.define("luongs", {
    hesoluong: {
      type: Sequelize.FLOAT,
    },
    luongcoban: {
      type: Sequelize.FLOAT,
    },
    songaycong: {
      type: Sequelize.INTEGER,
    },
    thang: {
      type: Sequelize.INTEGER,
    },
    nam: {
      type: Sequelize.INTEGER,
    },
    luongthuclinh: {
      type: Sequelize.FLOAT,
    },
    manv: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Luong;
};
