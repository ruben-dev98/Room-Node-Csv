import fs from 'fs';
import { Room } from './room';

const readAllRoomsData = (): string => {
    return fs.readFileSync('./rooms.json').toString();
}

const orderByPriceLowToHigh = (): Room[] => {
    const allRooms: Room[] = JSON.parse(readAllRoomsData());
    const roomsOrdered = allRooms.sort((room1, room2) => {
        if(room1.price > room2.price) {
            return 1;
        } else if(room1.price < room2.price) {
            return -1;
        }
        return 0;
    })
    return roomsOrdered;
}

const roomsToCsv = (): void => {
    const orderedRooms: Room[] = orderByPriceLowToHigh();
    let textToWrite: string = Object.keys(orderedRooms[0]).map(header => header.toUpperCase()).join(';');
    textToWrite += '\n';
    // id,foto,type,number,description,offer,price,cancellation,amenities,discount,status
    orderedRooms.forEach(room => {
        textToWrite += `"${room.id}"; "${room.foto}"; "${room.type}"; "${room.number}"; "${room.description}"; "${room.offer}"; "${room.price}"; "${room.cancellation}"; "${room.amenities.join(',').toString()}"; "${room.discount}"; "${room.status}";\n`; 
    })
    fs.writeFileSync('./rooms.csv', textToWrite);
}

roomsToCsv();