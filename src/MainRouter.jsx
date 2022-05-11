import React from 'react'
import { Switch,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

export default function MainRouter() {
  return (
    <Switch>
        <Route path='/' exact>
            <Home />
        </Route>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path='/register'>
            <Register />
        </Route>
    </Switch>
  )
}