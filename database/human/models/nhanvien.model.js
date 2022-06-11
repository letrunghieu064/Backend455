module.exports = (sequelize, Sequelize) => {
  const NhanVien = sequelize.define("nhanviens", {
    manv: {
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
    gioitinh: {
      type: Sequelize.TINYINT,
    },
    diachi: {
      type: Sequelize.STRING,
    },
    mapb: {
      type: Sequelize.INTEGER,
    },
  });
  return NhanVien;
};
