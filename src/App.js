import React from 'react'
import { Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css'
import './styles/main.scss'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { ProfileProvider } from './context/profile.context'

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path='/signin' component={SignIn} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </ProfileProvider>
  );
}

export default App;
