/* eslint-disable */
export function getNameInitials(name) {
  const words = name.toUpperCase().split(' ');
  const firstNameInitial = words[0][0];
  const lastNameInitial = words[1] ? words[1][0] : undefined;

  return lastNameInitial
    ? `${firstNameInitial}${lastNameInitial}`
    : `${firstNameInitial}`;
}

// To get the admin user in each room
export function transformToArr(snapshotValue) {
  return snapshotValue ? Object.keys(snapshotValue) : [];
}

export function transformToArrWithId(snapshotValue) {
  return snapshotValue
    ? Object.keys(snapshotValue).map(roomId => {
        return { ...snapshotValue[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};

  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');

  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  const [messageSnapshot, roomsSnapshot] = await Promise.all([
    getMsgs,
    getRooms,
  ]);

  messageSnapshot.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  roomsSnapshot.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}

// Function to group messages by date
export function groupBy(array, groupingKeyFn) {
  return array.reduce((result, item) => {
    const groupingKey = groupingKeyFn(item);

    if (!result[groupingKey]) {
      result[groupingKey] = [];
    }

    result[groupingKey].push(item);

    return result;
  }, {});
}
