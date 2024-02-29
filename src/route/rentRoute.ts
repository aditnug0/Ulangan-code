import express from "express";
import { createRent, deleteRent, readRent, updateRent } from "../controller/rentController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get car data
app.get(`/rent`, readRent);

// adress for add new car
app.post(`/rent`, createRent);

app.put(`/rent/:rentId`, updateRent);

app.delete(`/rent/:rentId`, deleteRent);


export default app;
