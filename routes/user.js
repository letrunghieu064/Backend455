const express = require("express");
const user_router = express.Router();
const user = require("../controllors/index");

user_router.post("/api/createnhanvien", user.createuser);
//user_router.get("/api/users", user.GetBirth);
user_router.post("/api/createluong", user.CreateLuong);
user_router.get("/api/listphongban", user.GetlistPhongBan);
user_router.get("/api/listnhanvien", user.GetListNhanVien);
user_router.get("/api/listgioitinh", user.Getlistgioitinh);
user_router.delete("/api/deletenhanvien", user.DeleteNhanVien);
user_router.get("/api/getbirth", user.GetBirth);
user_router.get("/api/getnhanvien", user.Getnhanvien);
user_router.get("/api/getluongnhanvien", user.GetLuongNhanVien);
module.exports = user_router;
