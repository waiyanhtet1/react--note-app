import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext'
import { LabelContextProvider } from './Context/LabelContext'
import  { MessageContextProvider } from './Context/MessageContext'
import MainRouter from './MainRouter'

export default function App() {
  return (
    <LabelContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
              <MainRouter />
          </BrowserRouter>
        </AuthContextProvider>
      </MessageContextProvider>
    </LabelContextProvider>
    
  )
}
