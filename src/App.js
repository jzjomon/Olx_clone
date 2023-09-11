import React,{ useEffect, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext } from './Context/AuthContext';
import { auth } from './Config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Create from "./Pages/Create";
import viewpost from './Pages/ViewPost'
import Post from './Context/postContext';
function App() {
  const { user,setUser }  = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user)
      }
    })
  })
  return ( 
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path='/'  Component={Home}/>
          <Route path='/signup' Component={Signup}/> 
          <Route path='/login' Component={Login}/> 
          <Route path='/create' Component={Create}/> 
          <Route path='/view' Component={viewpost}/>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
