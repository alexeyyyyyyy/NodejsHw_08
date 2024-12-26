import GarageService from "../services/GarageService";
import Car from "../models/Car";


export default class GarageController {
    private garageService: GarageService;

    constructor(garageService: GarageService) {
        this.garageService = garageService;
    }

     addCar(carDto:unknown){
        return  this.garageService.addCar(carDto as Car);
    }


     removeCar(regNumber: string) {
        return this.garageService.removeCar(regNumber);
    }

    findCarByRegNumber(regNumber: string):Car|null {
        return this.garageService.findCarByRegNumber(regNumber);
    }

    findCarByEngine(min: number, max: number):Car[] {
        return this.garageService.findCarByEngine(min, max);
    }

    findCarByModel(model: string):Car[] | null {
        return this.garageService.findCarsByModel(model);
    }

    findCarByColor(color: string):Car[] | null {
        return this.garageService.findCarByColor(color);
    }

    findCarByCompany(company: string):Car[] | null {
        return this.garageService.findCarByCompany(company);
    }
}