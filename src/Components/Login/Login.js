import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Config/firebase';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      if (email == "") {
        const timer = setInterval(() => {
          const interval = setInterval(() => {
            emailRef.current.style.borderColor = "red"
          }, 50)
          setTimeout(() => {
            clearInterval(interval);
            emailRef.current.style.borderColor = null
          }, 100);
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
        }, 400)
      }
      if(password == ""){
        const timer = setInterval(() => {
          const interval = setInterval(() => {
            passRef.current.style.borderColor = "red"
          }, 50)
          setTimeout(() => {
            clearInterval(interval);
            passRef.current.style.borderColor = null
          }, 100);
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
        }, 400)
      }
    }else {
      signInWithEmailAndPassword(auth, email, password).then(res => {
        navigate('/')
      }).catch((error) => {
        alert(error)
      })
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            ref={emailRef}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            ref={passRef}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
