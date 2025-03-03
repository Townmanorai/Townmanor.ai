// src/HomePage/BlogPosts.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LuCalendarCheck } from "react-icons/lu";

import './BlogPosts.css'
import "../common.css";
import "../commonsecond.css";
import blog from './BlogPost.json'
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
const BlogPosts = () => {
  const [blogdata, setblogdata] = useState([]);

  useEffect(() => {
    axios.get('https://www.townmanor.ai/api/articles')
    .then(response => {
      // Assuming the data is in response.data
      setblogdata(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the blog data:", error);
    });
  }, []); // Empty dependency array to ensure it runs only once on mount
  const {id}= useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <div className="owl-next"><i className="la la-long-arrow-right"></i></div>,
    prevArrow: <div className="owl-prev"><i className="la la-long-arrow-left"></i></div>,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          rows: 2, // Retain two rows on medium screens
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // For smaller screens show only 1 card per row
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }); 
};
  return (
    <section className="blog-grid hp6 section-padding pt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="section-heading text-left">
              <span>Our Blog Posts</span>
              <h3>LATEST NEWS &amp; ARTICLES</h3>
              <p>&nbsp;</p>
              <p className="blog_news_peh">
                Your Real Estate Resource Center: Explore market trends, insightful guides, and more—all in one place.
              </p>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="blog-grid-posts mg">
              <Slider {...settings}>
                {/* Dynamically render slides based on blogdata */}
                {blogdata.map((post) => (
                  <div key={post.id} className="product-wrap">
                    <div className="blog-single-post">
                      <div className="blog-img">
                        <Link to={`/article/${post.id}`} title={post.heading}>
                          <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+post.img} alt={post.heading}  style={{height:'19vh'}}/>
                        </Link>
                        <div className="view-post">
                          <Link to={`/article/${post.id}`} className="view-posts">View Post</Link>
                        </div>
                      </div>
                      <div className="post_info">
                        <ul className="post-nfo post_date">
                          <li><LuCalendarCheck style={{width:'14px', marginBottom:'4px', color:'white'}}/> {formatDate(post.date)}</li>
                        </ul>
                        <h3>
                          <Link to={`/article/${post.id}`} title={post.heading}>
                            {post.heading}
                          </Link>
                        </h3>
                        <p>{post.data.substring(0, 150)}...</p> {/* Show the first 150 characters as a preview */}
                        <Link className="read_more_blog" to={`/article/${post.id}`}>
                          Read More <i ><FaArrowRight style={{
                            height:'15px',
                            margin:'2px 0px'
                          }} /></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;