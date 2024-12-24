import e, {Router} from "express";
import GarageController from "../controller/GarageController";
import GarageServiceImpl from "../services/GarageServiceImpl";
import Car from "../models/Car";

const router = Router();

const garageService = new GarageServiceImpl();
const garageController = new GarageController(garageService);
router.post("/addCar", async (req,res)=>{
    const carDto = req.body;
    const isSuccess = await garageController.addCar(carDto);
    if(isSuccess){
        res.status(200).send("Okay");
    }else{
        res.status(500);
    }
})
router.delete('/car/:reqNumber', async (req, res) => {
    const { reqNumber } = req.params;
    const carDto = { reqNumber };
    const car = await garageController.deleteCar(carDto);

    if (car) {
        res.status(200).send("Car deleted successfully");
    } else {
        res.status(404).json({ error: "Car not found" });
    }
});

// @ts-ignore
router.get('/getCar/:reqNumber', async (req, res) => {
    const { reqNumber } = req.params;
    if (!reqNumber) {
        return res.status(400).json({ error: "ReqNumber is required" });
    }

    try {
        const car: Car | null = await garageService.findCarByRegNumber(reqNumber);
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        return res.json(car);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
export default router;