import GarageService from "../services/GarageService";
import Car from "../models/Car";
import {eventEmitter} from "../events/eventEmitter";

export default class GarageController {
    private garageService: GarageService;

    constructor(garageService: GarageService) {
        this.garageService = garageService;
    }

    async addCar(carDto:unknown){
        return await this.garageService.addCar(carDto as Car);
    }

    async deleteCar(carDto:unknown){
        const victim = this.garageService.deleteCar((carDto as { reqNumber: string; }).reqNumber);
        if(victim) {
            eventEmitter.emit('Car is deleted', victim.model);
        }else {
            console.log('Car not found');
        }
        return victim;
    }
}