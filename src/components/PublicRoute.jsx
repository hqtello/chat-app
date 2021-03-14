import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PublicRoute({ component: Component, ...props }) {
    const profile = true

    if (profile)
        return <Redirect to='/' />

    return (
        <Route {...props} component={Component} />
    )
}

export default PublicRoute