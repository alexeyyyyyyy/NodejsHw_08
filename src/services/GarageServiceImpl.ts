import GarageService from "./GarageService";
import Car from "../models/Car";
import GarageRepository from "../dao/GarageRepository";

export default class GarageServiceImpl implements GarageService {
    private cars: Car[] = [];
    private garageRepository = new GarageRepository();

    addCar(car: Car): boolean {
        return this.garageRepository.writeAll([car]);
    }

    deleteCar(reqNumber: string): Car | null {
      const index = this.cars.findIndex(elem => elem.reqNumber === reqNumber);
      const victim = this.cars.at(index) as Car;
      if(index === -1) {
          return null;
      }
       this.cars.splice(index,1)
        this.garageRepository.writeAll(this.cars);
      return victim;
    }

    findCarByRegNumber(reqNumber: string): Car | null {
        const car = this.cars.find(car => car.reqNumber === reqNumber);
        return car || null;
    }
}
