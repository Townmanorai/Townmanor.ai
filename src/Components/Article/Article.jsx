import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import blogk from '../HomePage/BlogPost.json'
import './Article.css'
function Article() {
  const [listdata, setlistdata] = useState([]);
  useEffect(() => {
    setlistdata(blogk);
  })
  console.log(listdata);
  const { id } = useParams();
  const post = blogk.find(post => post.id === parseInt(id));

  if (!post) {
    return <p>Post not found!</p>;
  }

  let currentdate = new Date();
  let formetteddate = currentdate.toLocaleDateString();

  return (
    <>
      <div className='article-main'>
        <div className='heading'>
          <h1>{post.heading}</h1>
        </div>
        <div className='content'>
          <div className='left-content'>
            {
              blogk.map((item, index) => (
                <a key={index}>
                  <p>
                    {item.heading}
                  </p>
                </a>
              ))
            }
          </div>

          <div className='right-content'>
            <div className='content-img'>
              <div className='cm-header'>
                <h6 style={{ fontSize: "20px", fontWeight: "600" }}>Townmanor </h6>
                <div>Date: {formetteddate}</div>
              </div>
              <div className='cont-m-img'>
                {<img src={post.img} alt="header-image" />}
                
              <p>{post.heading}</p>
              </div>
            </div>
            <div className='content-data'>
              <p>
                {post.data}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
