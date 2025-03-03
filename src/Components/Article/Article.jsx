import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import blogk from '../HomePage/BlogPost.json'
import './Article.css'
import axios from 'axios';
function Article() {
  const [listdata, setlistdata] = useState([]);
 
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://www.townmanor.ai/api/articles/${id}`)
      .then(response => {
        // Assuming the data is in response.data
        setlistdata(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blog data:", error);
      });
  })
  
 



  let currentdate = new Date();
  let formetteddate = currentdate.toLocaleDateString();

  return (
    <>
    <div style={{
      height:'80px'
    }}>

    </div>
      <div className='article-main' style={{
            width:'98%'
          }}>
        <div className='heading'>
          <h1>{listdata.heading}</h1>
        </div>
        <div className='content'>
          {/* <div className='left-content'>
            {
              listdata.map((item, index) => (
                <a key={index}>
                  <p>
                    {item.heading}
                  </p>
                </a>
              ))
            }
          </div> */}

          <div className='right-content' >
            <div className='content-img'>
              <div className='cm-header'>
                <h6 style={{ fontSize: "20px", fontWeight: "600" }}>Townmanor </h6>
                <div>Date: {formetteddate}</div>
              </div>
              <div className='cont-m-img'>
                {<img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+listdata.img} alt="header-image"  style={{
                  width:'38%',
                  height:'450px'
                }}/>}
                
              <p>{listdata.heading}</p>
              </div>
            </div>
            <div className='content-data'>
              <p>
                {listdata.data}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
