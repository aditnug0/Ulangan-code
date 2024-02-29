import { PrismaClient } from "@prisma/client";
import { Request, Response, request, response } from "express";


// create an object from prisma
const prisma = new PrismaClient({ log: ["error"] });

// create a function to "create" new rent
// asyncronous = fungsi yang berjalan secara pararel
const createRent = async (request: Request, response: Response) => {
    try {
        // read a request from body
        const carId = request.body.carId;
        const namaPenyewa = request.body.namaPenyewa;
        const tanggal = new Date(request.body.tanggal).toISOString();
        const lamaSewa = request.body.lamaSewa;

        const mobil = await prisma.car.findUnique({
            where: {
                carId: carId
            }
        })

        if (!mobil) {
            return response.status(401).json({
                status: true,
                message: "Car not found"
            })
        }

        const totalBayar = mobil.priceDay * lamaSewa

        //insert to rent table using prisma
        const newData = await prisma.rent.create({
            data: {
                carId: carId,
                namaPenyewa: namaPenyewa,
                tanggal: tanggal,
                lamaSewa: lamaSewa,
                totalBayar: totalBayar
            }

        });
        // const totalbayar = 
        return response.status(200).json({
            status: true,
            message: `Data rent has been created`,
            data: newData
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};

// create a function to READ rent
const readRent = async (request: Request, response: Response) => {
    try {
        // pagination
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        // searching
        const keyword = request.query.keyword?.toString() || "";

        // await untuk memebri delay pada sistem asyncronous sehingga berjalan
        // seperti syncronous dan menunggu sistem sebelumnya
        const rentData = await prisma.rent.findMany({
            //untuk mendefinisikan jml data yang diambil
            take: qty,
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { namaPenyewa: { contains: keyword } }
                ]
            },
            orderBy: { rentId: "asc" }
        });
        return response.status(200).json({
            status: true,
            message: `Rent list has been loaded`,
            data: rentData,
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};


// baru
// function for update rent
const updateRent = async (request: Request, response: Response) => {

    try {
        // read rent id that sent from url
        const rentId = request.params.rentId
        // read data perubahan
        const carId = request.body.carId
        const namaPenyewa = request.body.namaPenyewa
        const lamaSewa = request.body.lamaSewa
        const tanggal = new Date(request.body.tanggal).toISOString();

        // make sure that data has existed
        const findRent = await prisma.rent.findFirst({
            where: { rentId: Number(rentId) }
        })

        if (!findRent) {
            return response.status(400).json({
                status: false,
                message: `Rent data not found`
            })
        }

        const dataRent = await prisma.rent.update({
            where: { rentId: Number(rentId) },
            data: {
                carId: carId || findRent.carId,
                namaPenyewa: namaPenyewa || findRent.namaPenyewa,
                lamaSewa: lamaSewa || findRent.lamaSewa,
                tanggal: tanggal || findRent.tanggal
            }
        })

        return response.status(200).json({
            status: true,
            message: `Data has been updated`,
            data: dataRent
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}
// create a function to delete rent
const deleteRent = async (request: Request, response: Response) => {
    try {

        // get rent id from url 
        const rentId = request.params.rentId

        // make sure that rent is exist 
        const findRents = await prisma.rent.findFirst({
            where: { rentId: Number(rentId) }
        })

        if (!findRents) {
            return response.status(400).json({
                status: false,
                message: `Data not found`
            })
        }

        // execute for delete rent
        const dataRents = await prisma.rent.delete({
            where: { rentId: Number(rentId) }
        })

        // return response 
        return response.status(200).json({
            status: true,
            message: `Rent data has been deleted `
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
}

export { createRent, readRent, updateRent, deleteRent };
