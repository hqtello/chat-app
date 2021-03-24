import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'rsuite';

import ChatTop from '../../components/chat-window/ChatTop';
import Messages from '../../components/chat-window/Messages';
import ChatBottom from '../../components/chat-window/ChatBottom';
import { useRooms } from '../../context/rooms.context';

function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms)
    return <Loader center vertical size="md" content="Loading" speed="slow" />;

  const currentRoom = rooms.find(room => room.id === chatId);
  if (!currentRoom)
    return <h6 className="text-center mt-page">Chat {chatId} not found.</h6>;

  return (
    <>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
}

export default Chat;
