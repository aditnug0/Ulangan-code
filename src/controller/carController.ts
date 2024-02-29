import { PrismaClient } from "@prisma/client";
import { Request, Response, request, response } from "express";

import { sign } from "jsonwebtoken";


// create an object from prisma
const prisma = new PrismaClient();

// create a function to "create" new car
// asyncronous = fungsi yang berjalan secara pararel
const createCar = async (request: Request, response: Response) => {
    try {
        // read a request from body
        const nopol = request.body.nopol;
        const merekMobil = request.body.merekMobil;
        const priceDay = request.body.priceDay;



        //insert to car table using prisma
        const newData = await prisma.car.create({
            data: {
                nopol: nopol,
                merekMobil: merekMobil,
                priceDay: priceDay
            }
        });
        return response.status(200).json({
            status: true,
            message: `Data car has been created`,
            data: newData,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};

// create a function to READ car
const readCar = async (request: Request, response: Response) => {
    try {
        // pagination
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        // searching
        const keyword = request.query.keyword?.toString() || "";

        // await untuk memebri delay pada sistem asyncronous sehingga berjalan
        // seperti syncronous dan menunggu sistem sebelumnya
        const carData = await prisma.car.findMany({
            //untuk mendefinisikan jml data yang diambil
            take: qty,
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { nopol: { contains: keyword } },
                    { merekMobil: { contains: keyword } }
                ]
            },
            orderBy: { carId: "asc" }
        });
        return response.status(200).json({
            status: true,
            message: `Car list has been loaded`,
            data: carData,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};


// baru
// function for update car
const updateCar = async (request: Request, response: Response) => {

    try {
        // read car id that sent from url
        const carId = request.params.carId
        // read data perubahan
        const nopol = request.body.nopol
        const merekMobil = request.body.merekMobil
        const priceDay = request.body.priceDay
        // make sure that data has existed
        const findCar = await prisma.car.findFirst({
            where: { carId: Number(carId) }
        })

        if (!findCar) {
            return response.status(400).json({
                status: false,
                message: `Car data not found`
            })
        }

        const dataCar = await prisma.car.update({
            where: { carId: Number(carId) },
            data: {
                nopol: nopol || findCar.nopol,
                merekMobil: merekMobil || findCar.merekMobil,
                priceDay: priceDay || findCar.priceDay,
            }
        })

        return response.status(200).json({
            status: true,
            message: `Data has been updated`,
            data: dataCar
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
// create a function to delete car
const deleteCar = async (request: Request, response: Response) => {
    try {

        // get car id from url 
        const carId = request.params.carId

        // make sure that car is exist 
        const findCars = await prisma.car.findFirst({
            where: { carId: Number(carId) }
        })

        if (!findCars) {
            return response.status(400).json({
                status: false,
                message: `Data not found`
            })
        }

        // execute for delete car
        const dataCars = await prisma.car.delete({
            where: { carId: Number(carId) }
        })

        // return response 
        return response.status(200).json({
            status: true,
            message: `Car data has been deleted `
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}

export { createCar, readCar, updateCar, deleteCar };
