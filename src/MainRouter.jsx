import React from 'react'
import { Switch,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Note_Create from './Pages/Note/Note_Create'
import Note_Edit from './Pages/Note/Note_Edit'
import All_Label from './Pages/Label/All_Label'
import Create_Label from './Pages/Label/Create_Label'
import Edit_Label from './Pages/Label/Edit_Label'

export default function MainRouter() {
  return (
    <Switch>
        <Route path='/' exact>
            <Home />
        </Route>
        <Route path='/:category_slug/note' exact>
            <Home />
        </Route>
        <Route path='/note/create' exact>
            <Note_Create />
        </Route>
        <Route path='/note/:slug' exact>
            <Note_Edit />
        </Route>
        <Route path='/login' exact>
            <Login />
        </Route>
        <Route path='/register' exact>
            <Register />
        </Route>

        {/* Label */}
        <Route path='/label' exact>
            <All_Label />
        </Route>
        <Route path='/label/create' exact>
            <Create_Label />
        </Route>
        <Route path='/label/edit/:slug' exact>
            <Edit_Label />
        </Route>
        

    </Switch>
  )
}
