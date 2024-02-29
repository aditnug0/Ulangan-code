import express from "express";
import { createAdmin, deleteAdmin, login, readAdmin, updateAdmin } from "../controller/adminController";
import { verifyAdmin } from "../middleware/verify";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get admin data
app.get(`/admin`, verifyAdmin, readAdmin);

// adress for add new admin
app.post(`/admin`, verifyAdmin, createAdmin);

app.put(`/admin/:adminId`, verifyAdmin, updateAdmin);

app.delete(`/admin/:adminId`, verifyAdmin, deleteAdmin);

app.post(`/admin/login`, login,);


export default app;
