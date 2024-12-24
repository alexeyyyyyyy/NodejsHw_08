import * as fs from "node:fs";
import Car from "../models/Car";

export default class GarageRepository {
    private readonly filePath: string;

    constructor(filePath = './db.txt') {
        this.filePath = filePath;
    }


    readAll(): Car[] {
        try {
            const data = fs.readFileSync(this.filePath, { encoding: 'utf-8' });
            return JSON.parse(data) as Car[];
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error reading file: ${err.message}`);
            } else {
                console.error('Unknown error occurred while reading file.');
            }
            return [];
        }
    }


    writeAll(cars: Car[]): boolean {
        try {
            const data = JSON.stringify(cars, null, 2);
            fs.writeFileSync(this.filePath, data, { encoding: 'utf-8' });
            console.log("Data written successfully.");
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error writing file: ${err.message}`);
            } else {
                console.error('Unknown error occurred while writing to file.');
            }
            return false;
        }
    }


    write(car: Car): boolean {
        try {
            const cars = this.readAll();
            cars.push(car);
            return this.writeAll(cars);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error adding car: ${err.message}`);
            } else {
                console.error('Unknown error occurred while adding car.');
            }
            return false;
        }
    }
}
