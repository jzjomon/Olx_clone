import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Context/postContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/firebase';
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const userRef = collection(db, "users");
  const userid = postDetails.userId;
  const q = query(userRef, where("id","==",userid))
  useEffect(() => {
     getDocs(q).then(res => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      })
     })
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
