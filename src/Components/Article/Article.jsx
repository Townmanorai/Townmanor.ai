import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import blogk from '../HomePage/BlogPost.json';// Import the blog data
import './Article.css'
function Article() {
  const { id } = useParams(); // Get the id from the URL
  const post = blogk.find(post => post.id === parseInt(id)); // Find the post by id

  if (!post) {
    return <p>Post not found!</p>; // Handle case when post is not found
  }

  return (
    <>
      <section className="pager-sec bfr widget_edit_enabled">
        <div className="container">
          <div className="pager-sec-details">
            <h3>{post.heading}</h3>
            <ul className="breadcrumb">
              <li><a href="https://townmanor.in/en">Home</a><span className="delimiter"></span></li>
              <li><span></span><span className="delimiter"></span></li>
              <li><span>{post.heading}</span></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="listing-main-sec section-padding2">
        <div className="container" style={{
            maxWidth:'1440px'
        }}>
          <div className="listing-main-sec-details" style={{
            display:'flex'
          }}>
            <div className="row" style={{
                flexBasis:'91%'
            }}>
              <div className="col-lg-8">
                <div className="blog-single-post single" style={{
            Width:'111% !important'
        }}>
                  <h1>{post.heading} </h1>
                 <br></br>
                  <p>{post.data}</p> {/* Render full post data here */}
                </div>
              </div>
            
            </div>
            <div style={{
                flexBasis:'30%'
            }}>
                <img src={post.img} style={{
                        width: '23vw',
                        height: '28vh',
                        border: '2px solid #e3e1e1',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '1px 1px 1px 1px gray'
                }}></img>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Article;
