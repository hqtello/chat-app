/* eslint-disable */
export function getNameInitials(name) {
  const words = name.toUpperCase().split(' ');
  const firstNameInitial = words[0][0];
  const lastNameInitial = words[1] ? words[1][0] : undefined;

  return lastNameInitial
    ? `${firstNameInitial}${lastNameInitial}`
    : `${firstNameInitial}`;
}

export function transformToArrWithId(snapshotValue) {
  return snapshotValue
    ? Object.keys(snapshotValue).map(roomId => {
        return { ...snapshotValue[roomId], id: roomId };
      })
    : [];
}
