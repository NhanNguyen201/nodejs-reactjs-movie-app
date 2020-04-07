const users = [];

const addUser = ({ id, name, roomHost }) => {
  name = name.trim().toLowerCase();
  roomHost = roomHost.trim().toLowerCase();

  const existingUser = users.find((user) => user.roomHost === roomHost && user.name === name);

  if (!name || !roomHost) return { error: 'Username and roomHost are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, roomHost };

  users.push( user );

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomHost) => users.filter((user) => user.roomHost === roomHost);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
