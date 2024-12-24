import {EventEmitter} from "node:events";

export const eventEmitter = new EventEmitter();

eventEmitter.on('CarDeleted',(car:string)=> {
    console.log(`${car} is deleted`);
})