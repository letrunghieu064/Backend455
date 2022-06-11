const { redirect, type } = require("express/lib/response");
const db = require("../database/index.js");
exports.createuser = async (req, res) => {
  try {
    console.log(
      "ho ",
      req.body.ho,
      "ten",
      req.body.ten,
      "ngay sinh ",
      req.body.ngaysinh
    );
    await db.nhanvien
      .create({
        manv: req.body.manv,
        ho: req.body.ho,
        ten: req.body.ten,
        ngaysinh: req.body.ngaysinh,
        gioitinh: req.body.gioitinh,
        diachi: req.body.diachi,
        mapb: req.body.mapb,
      })
      .then((nhanvien) => {
        console.log("user", nhanvien);
        if (nhanvien) {
          res.status(200).send({
            message: "xử lý thành công",
            statusCode: 200,
            content: nhanvien,
          });
        }
      })

      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: "xử lý không thành công" });
      });

    await db.osin.create({
      manv2: req.body.manv,
      ho: req.body.ho,
      ten: req.body.ten,
      ngaysinh: req.body.ngaysinh,
    });
  } catch (err) {
    console.error(err);
  }
};
exports.CreatePB = async (req, res) => {
  db.phongban
    .create({
      mapb: req.body.mapb,
      tenphongban: req.body.tenphongban,
    })
    .then((phongban) => {
      res.status(200).send({ message: "thành coong", Content: phongban });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "xử lý không thành công" });
    });
};
exports.CreateLuong = async (req, res) => {
  // const manv1 = db.nhanvien.findOne({ where: { manv: req.params.id } });
  const luongthuclinh =
    req.body.hesoluong * req.body.luongcoban * req.body.songaycong;
  db.luong
    .create({
      hesoluong: req.body.hesoluong,
      luongcoban: req.body.luongcoban,
      songaycong: req.body.songaycong,
      thang: req.body.thang,
      nam: req.body.nam,
      luongthuclinh: luongthuclinh,
      manv: req.body.manv,
    })
    .then((luong) => {
      if (luong) {
        res.status(200).send({ message: "thanh cong", content: luong });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ message: " khong thanh cong" });
    });
};
exports.GetlistPhongBan = async (req, res) => {
  await db.phongban.findAll().then((phongbans) => {
    if (phongbans) {
      res.status(200).send({ statusCode: "200", content: phongbans });
    }
  });
};

exports.GetBirth = async (req, res) => {
  try {
    // let d = new Date();
    // var str = d.getDate() + "/" + d.getMonth();
    // console.log(str);
    // await db.nhanvien.findOne({ where: {} });
    var curDate = new Date();
    var same = curDate.getDate();
    var curMonth = curDate.getMonth() + 1;
    var chuoingay = curMonth + "/" + same;
    console.log(chuoingay);
    const nhanvien = await db.nhanvien.findAll();
    const promise1 = await nhanvien.map(async (el) => {
      var pos = el.ngaysinh.lastIndexOf("/");
      var A = el.ngaysinh.slice(0, pos);
      // console.log("chuoi ngay", chuoingay);

      // console.log("A", A);
      //  const mangngaysinh = el.ngaysinh.getDate() + "/" + el.ngaysinh.getMonth();
      //   el.ngaysinh.toString() = mangngaysinh;
      //  console.log(el.ngaysinh);
      el.ngaysinh = A;
      return el;
    });
    let ngaysinh1 = await Promise.all(promise1);
    console.log(ngaysinh1);
    const object = {};
    const promisenhanvienbitrh = await ngaysinh1.map(async (nv) => {
      //  console.log("nhanvienbirth", nv.ngaysinh);
      if (nv.ngaysinh === chuoingay)
        // return nv;
        return nv; //.setDataValue("ten", nv.ngaysinh);
    });
    let nhanvienbirth = await Promise.all(promisenhanvienbitrh);
    if (nhanvienbirth) {
      res.status(200).json({
        statusCode: 200,
        message: "xử lý thành công",
        content: nhanvienbirth,
      });
    } else {
      res.status(400).json({ message: "không thành cônhg" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "không thành cônhg" });
  }

  // const nhanvien1=  promise.all(promise)
  // Lấy ngày hiện tại
  // var curDay = curDate.getDate();
  // console.log(curDay);
  // console.log(typeof curDay);
  // var day = curDay.toString();
  // console.log(typeof day);
  // // Lấy tháng hiện tại
  // var curMonth = curDate.getMonth() + 1;
  // console.log(curMonth);
  // var month = curMonth.toString();
  // await db.nhanvien.findOne({});
};

exports.GetListNhanVien = async (req, res) => {
  // try {
  //   const luong = await db.luong.findAll();

  //   const promises = luong.map(async (item) => {
  //     // console.log(item);
  //     if (item.manv) {
  //       const osin = await db.osin.findOne({
  //         where: { manv2: item.manv },
  //         attributes: ["manv2", "ho", "ten", "ngaysinh"],
  //       });
  //       item.manv = osin;
  //     }
  //     return item;
  //   });

  //   let data = await Promise.all(promises);
  //   if (data) {
  //     res
  //       .status(200)
  //       .send({ statusCode: 200, message: "xử lý thành công!", content: data });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  try {
    await db.nhanvien.findAll().then((nhanvien) => {
      console.log(nhanvien);
      if (nhanvien) {
        res.status(200).send({ statusCode: "200", content: nhanvien });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ statusCode: "400" });
  }
};
exports.Getnhanvien = async (req, res) => {
  try {
    const id = req.query.manv;
    const luong = await db.luong.findOne({
      where: {
        manv: id,
      },
      attributes: [
        "hesoluong",
        "luongcoban",
        "songaycong",
        "thang",
        "nam",
        "luongthuclinh",
      ],
    });
    const nhanvien = await db.osin.findOne({
      where: { manv2: id },
      attributes: ["ho", "ten", "ngaysinh"],
    });
    luong.setDataValue("manv2", nhanvien);
    if (luong) {
      res.status(200).send({ statusCode: "200", content: luong });
    } else {
      res.status(400).send({ statusCode: "400" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.Getlistgioitinh = async (req, res) => {
  // await db.nhanvien.findAll({ attributes: ["gioitinh"] }).then((gioitinh) => {
  res.status(200).json({
    statusCode: 200,
    content: [
      { id: 1, gioitinh: "nam" },
      { id: 2, gioitinh: "nữ" },
      { id: 3, gioitinh: "khác" },
    ],
  });
  // });
};
exports.DeleteNhanVien = async (req, res) => {
  let id = req.query.employeeeId;
  try {
    const nhanvien = await db.nhanvien.findOne({ where: { manv: id } });
    const osin = await db.osin.findOne({ where: { manv2: id } });
    if (nhanvien) {
      await nhanvien.destroy();
      await osin.destroy();
      return res.status(200).send({
        message: "đã xoá thành công nhan viên có mã nhân viên :" + id,
      });
    } else {
      res.status(400).send({ message: "xoá không thành công " });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.GetLuongNhanVien = async (req, res) => {
  let id = req.query.manv;
  try {
    const luong1 = await db.luong.findOne({ where: { manv: id } });
    if (luong1) {
      return res.status(200).json(luong1);
    } else {
      res.status(400).send({ message: "xử lý  không thành công " });
    }
  } catch (err) {
    console.error(err);
  }
};
