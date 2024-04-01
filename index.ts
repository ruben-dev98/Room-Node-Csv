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
    let textToWrite = Object.keys(orderedRooms[0]).join(',');
    textToWrite += '\n';
    orderedRooms.forEach(room => {
        textToWrite += `"${room.id}", "${room.amenities.toString()}"\n`; 
    })
    fs.writeFileSync('./rooms.csv', textToWrite);
}

roomsToCsv();