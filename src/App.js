import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext'
import  { MessageContextProvider } from './Context/MessageContext'
import MainRouter from './MainRouter'

export default function App() {
  return (
    <MessageContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
      </AuthContextProvider>
    </MessageContextProvider>
    
  )
}
