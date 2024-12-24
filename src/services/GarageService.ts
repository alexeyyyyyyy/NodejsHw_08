import Car from "../models/Car";

export default interface GarageService {
    addCar(car: Car): boolean;
    deleteCar(reqNumber: string): Car | null;
    findCarByRegNumber(reqNumber: string): Car| null;
}
