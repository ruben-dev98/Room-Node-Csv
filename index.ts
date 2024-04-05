import fs from 'fs';
import { Room } from './room';

const readAllRoomsData = (): Room[] => {
    return JSON.parse(fs.readFileSync('./rooms.json').toString());
}

const orderByPriceLowToHigh = (allRooms: Room[]): Room[] => {
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

const roomsToCsv = (orderedRooms: Room[]): void => {
    const roomsKeys = Object.keys(orderedRooms[0]);
    let textToWrite: string = roomsKeys.map(header => header.toUpperCase()).join(';');
    orderedRooms.forEach(room => {
        textToWrite += '\n';
        roomsKeys.forEach((key) => {
            const roomKey = key as keyof Room;
            textToWrite += `"${room[roomKey]}";`;
        })
    })
    fs.writeFileSync('./rooms.csv', textToWrite);
}

const main = () => {
    const rooms = readAllRoomsData();
    const roomsOrdered = orderByPriceLowToHigh(rooms);
    roomsToCsv(roomsOrdered);
}

main();