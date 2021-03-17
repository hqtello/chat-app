import React from 'react'
import { Button, Icon, Drawer } from 'rsuite'

import { useModalState, useMediaQuery } from '../../misc/custom-hooks'
import Dashboard from './Dashboard'

function DashboardToggle() {
    const { isOpen, open, close } = useModalState()
    const isMobile = useMediaQuery('(max-width: 992px)')

    return (
        <>
            <Button block color='blue' onClick={open}>
                <Icon icon='dashboard' /> Dashboard
            </Button>
            <Drawer
                full={isMobile}
                show={isOpen}
                onHide={close}
                placement='left'
            >
                <Dashboard />
            </Drawer>
        </>
    )
}

export default DashboardToggle