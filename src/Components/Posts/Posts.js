import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { PostContext } from '../../Context/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate()
  const [limited, setLimited] = useState([])
  const  productRef = collection(db, "products")
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const q = query(productRef,orderBy('createdAt',"desc"),limit(8));
  useEffect(() => {
    getDocs(productRef).then(res => {
      const allpost = res.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allpost);
    })
  },[])
  useEffect(() => {
    getDocs(q).then(res => {
      const limitedpost = res.docs.map(product => product.data());
      setLimited(limitedpost);
    })
  },[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(product => {

          return  <div
            className="card"
            onClick={() => {setPostDetails(product);navigate('/view')} }
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            })
        }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            limited.map(product => (
              <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            ))
            
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
