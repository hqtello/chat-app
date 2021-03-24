import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room-context';

function ChatTop() {
  const name = useCurrentRoom(value => value.name);

  return <div>{name}</div>;
}

export default memo(ChatTop);