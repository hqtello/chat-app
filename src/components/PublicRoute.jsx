import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Container, Loader } from 'rsuite'

import { useProfile } from '../context/profile.context'

function PublicRoute({ component: Component, ...props }) {
    const { profile, isLoading } = useProfile()

    if (isLoading && !profile) {
        return (
            <Container>
                <Loader
                    center
                    vertical
                    size="md"
                    content="Loading"
                    speed="slow"
                />
            </Container>
        )
    }

    if (profile && !isLoading)
        return <Redirect to='/' />

    return (
        <Route {...props} component={Component} />
    )
}

export default PublicRoute