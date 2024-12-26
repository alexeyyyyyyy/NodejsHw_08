import {Router} from "express";
import GarageController from "../controller/GarageController";
import GarageServiceImpl from "../services/GarageServiceImpl";
import {body, validationResult} from "express-validator";
import validationMiddleware from "../middleware/validationMiddleware";

const router = Router();

const garageService = new GarageServiceImpl();
const garageController = new GarageController(garageService);
router.post("/addCar",
    body("regNumber").isString().notEmpty(),
    body("model").isString().notEmpty(),
    body("company").isString().notEmpty(),
    body("engine").isFloat({min: 0.8, max: 6.0}),
    body("color").isString().notEmpty(),
    validationMiddleware, (req, res) => {
        const carDto = req.body;
        const isSuccess = garageController.addCar(carDto);
        if (isSuccess) {
            res.status(200).send("Okay");
        } else {
            res.status(409).send("Car already exists");
        }
    })

//http://localhost:3000/api/garage/removeCar?regNumber=qwerty123
router.delete("/removeCar", async (req, res) => {
    const {regNumber} = req.query;
    const car = garageController.removeCar(regNumber + "");
    if (car) {
        res.status(200).send({car});
    } else {
        res.status(409).send("Car already exists");
    }

})
router.get("/findCarByRegNumber", async (req, res) => {
    const {regNumber} = req.query;
    const car = garageController.findCarByRegNumber(regNumber + "");
    if (car) {
        res.status(200).send({car});
    } else {
        res.status(409).send("Car already exists");
    }

})
router.get("/findCarsByEngine", async (req, res) => {
    const {min, max} = req.query;
    const cars = garageController.findCarByEngine(Number.parseFloat(min + ""), Number.parseFloat(max + ""));
    if (cars.length) {
        res.status(200).send({cars});
    } else {
        res.status(409).send("Car already exists");
    }

})
router.get("/findCarByModel", async (req,res)=>{
    const {model} = req.query ;
    const cars =  garageController.findCarByModel(model + "");
    if(cars) {
        res.status(200).send({cars});

    }else{
        res.status(409).send("Can't Find this model");
    }

})
router.get("/findCarByColor", async (req,res)=>{
    const {color} = req.query ;
    const cars =  garageController.findCarByColor(color + "");
    if(cars) {
        res.status(200).send({cars});

    }else{
        res.status(409).send("Can't Find this color");
    }

})

router.get("/findCarByCompany", async (req,res)=>{
    const {company} = req.query ;
    const cars =  garageController.findCarByCompany(company + "");
    if(cars) {
        res.status(200).send({cars});

    }else{
        res.status(409).send("Can't Find this company");
    }

})

export default router;