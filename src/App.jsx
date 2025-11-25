import React from 'react'
import { Route, Routes } from 'react-router'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'


function App() {

  return (

    <Routes>
      <Route path='/' element={<LoginScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route element={<AuthMiddleware/>}>       {/* Primero pasara por aca antes de por home */}
        <Route path='/home' element={<HomeScreen/>}/>
        <Route path='/workspace/new' element={<CreateWorkspaceScreen/>}/>
      </Route>
    </Routes>

  )
}

export default App
