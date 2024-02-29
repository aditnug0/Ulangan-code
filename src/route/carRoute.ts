import express from "express";
import { createCar, deleteCar, readCar, updateCar } from "../controller/carController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get car data
app.get(`/car`, readCar);

// adress for add new car
app.post(`/car`, createCar);

app.put(`/car/:carId`, updateCar);

app.delete(`/car/:carId`, deleteCar);


export default app;
