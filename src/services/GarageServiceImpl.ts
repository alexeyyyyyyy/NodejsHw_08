import GarageService from "./GarageService";
import Car from "../models/Car";
import GarageRepository from "../dao/GarageRepository";

export default class  GarageServiceImpl implements GarageService {
    private garageRepository = new GarageRepository();

    addCar(car: Car): boolean {
        const cars: Car[] = this.garageRepository.readAll();
        if (!car.regNumber) {
            console.error("Car registration number is required");
            return false;
        }

        if (cars.find(c => c.regNumber.toLowerCase() === car.regNumber.toLowerCase())) {
            console.error(`Car with regNumber ${car.regNumber} already exists`); // TODO 409
            return false;
        }

        cars.push(car);
        return this.garageRepository.writeAll(cars);
    }

    removeCar(regNumber: string): Car|null{
       const cars = this.garageRepository.readAll();
       const index = cars.findIndex(c => c.regNumber.toLowerCase() === regNumber.toLowerCase());
       if(index === -1) {
           return null;
       }
       const [removeCar] = cars.splice(index, 1);
       this.garageRepository.writeAll(cars);

       return removeCar;
    }

    findCarByRegNumber(regNumber: string): Car | null  {
        const cars = this.garageRepository.readAll();
        return cars.find(c => c.regNumber.toLowerCase() === regNumber.toLowerCase()) || null;
    }

    findCarByEngine(min: number, max: number): Car[] {
        const cars = this.garageRepository.readAll();
        return cars.filter(c => c.engine >= min && c.engine < max);
    }

    findCarsByModel(model: string): Car[] | null     {
        const cars = this.garageRepository.readAll();
        return cars.filter(c => c.model && c.model.toLowerCase() === model.toLowerCase()) || null;
    }

    findCarByColor(color: string): Car[] | null {
        const cars = this.garageRepository.readAll();
        return cars.filter(c => c.color && c.color.toLowerCase() === color.toLowerCase()) || null;
    }

    findCarByCompany(company: string): Car[] | null {
        const cars = this.garageRepository.readAll();
        return cars.filter(c => c.company && c.company.toLowerCase() === company.toLowerCase()) || null;
    }
}
