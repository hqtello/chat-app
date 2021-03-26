import React from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';

import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import Dashboard from './Dashboard';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/profile.context';

function DashboardToggle() {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const handleSingOut = () => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();

        Alert.info('Signed out', 4000);

        // close the dashboard drawer
        close();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={handleSingOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
