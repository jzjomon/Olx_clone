import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../Context/AuthContext';
import { db, storage } from '../../Config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const date = new Date();
  const navigate = useNavigate();
  const imgCollection = collection(db, 'products');
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const handleSubmit = () => {
    const imgRef = ref(storage, `files/${img.name}`);
    uploadBytes(imgRef,img).then(res => {
      getDownloadURL(res.ref).then(url => {
        addDoc(imgCollection, {
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt: date.toDateString()
        })
      }).then(() => {
        navigate('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" onChange={(e) => setPrice(e.target.value)} />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={img ? URL.createObjectURL(img) : ""} ></img>

          <br />
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
