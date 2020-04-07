var rooms = [];

const addRoom = (roomHost) => {
    rooms.push({
        roomHost: roomHost,
        roomMember: 0,
        img: ''
    })
}

const removeRoom = (roomHost) => {
    const index = rooms.findIndex((room) => room.roomHost === roomHost);
    if ( index !== -1 ) return rooms.splice(index, 1)[0];
}

const getRoom = (roomHost) => rooms.find(room => room.roomHost === roomHost);



module.exports = {rooms, addRoom, removeRoom, getRoom}