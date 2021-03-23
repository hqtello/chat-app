import React, { useRef, useState, useEffect } from 'react';
import { Divider } from 'rsuite';

import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal';

import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

function Sidebar() {
  // Get the height of the component in Window
  const topSideBarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSideBarRef.current) setHeight(topSideBarRef.current.scrollHeight);
  }, [topSideBarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join conversation</Divider>
      </div>
      <ChatRoomList topComponentHeight={height} />
    </div>
  );
}

export default Sidebar;
