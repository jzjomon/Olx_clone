import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import './Signup.css';


export default function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const userCollection = collection(db, 'users');
  const userNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    if(userName == "" || email == "" ||  phone == "" || password == ""){
        if (userName == "") {
      const timer = setInterval(() => {
        const interval = setInterval(() => {
          userNameRef.current.style.borderColor = "red"
        }, 50)
        setTimeout(() => {
          clearInterval(interval);
          userNameRef.current.style.borderColor = null
        }, 100);
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
      }, 400)
    }
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
    if (phone == "") {
      const timer = setInterval(() => {
        const interval = setInterval(() => {
          phoneRef.current.style.borderColor = "red"
        }, 50)
        setTimeout(() => {
          clearInterval(interval);
          phoneRef.current.style.borderColor = null
        }, 100);
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
      }, 400)
    }
    if (password == "" ) {
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
    }}else if(password.length < 6){
      alert('password must be contain 6 charachters');
    }else{
         createUserWithEmailAndPassword(auth, email, password).then( (res) => {
           updateProfile(res.user, {
            displayName: userName
           }).then(() => {
                  addDoc(userCollection, {
                    id: res.user.uid,
                    username: userName,
                    phone: phone
                  }).then(() => {
                    navigate('/login');
                  })
                  .catch(Error => {
                    alert(Error.message)
                  })
           })
           .catch(err => {
            alert('you already have an account. please login !');
            setUserName("")
            setEmail("")
            setPhone("")
            setPassword("")
          })
      })
    }}
    catch (err) {
      alert("something went wrong !")
    }
    }
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt='Logo.png' src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={userName}
            type="text"
            id="fname"
            name="name"
            ref={userNameRef}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            name="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            name="phone"
            ref={phoneRef}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            name="password"
            ref={passRef}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button className='signUpBtn'>Signup</button>
        </form>
        <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
