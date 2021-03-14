import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...props }) {
    const profile = true

    if (!profile)
        return <Redirect to='/signin' />

    return (
        <Route {...props} component={Component} />
    )
}

export default PrivateRoute