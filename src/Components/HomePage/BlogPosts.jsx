// src/HomePage/BlogPosts.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './BlogPosts.css'
import "../common.css";
import "../commonsecond.css";
import blog from './BlogPost.json'
import { Link, useParams } from 'react-router-dom';
const BlogPosts = () => {
  const [blogdata, setblogdata] = useState([]);

  useEffect(() => {
    setblogdata(blog);
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
                          <img src={post.img} alt={post.heading}  style={{height:'19vh'}}/>
                        </Link>
                        <div className="view-post">
                          <Link to={`/article/${post.id}`} className="view-posts">View Post</Link>
                        </div>
                      </div>
                      <div className="post_info">
                        <ul className="post-nfo post_date">
                          <li><i className="la la-calendar"></i> {post.date}</li>
                        </ul>
                        <h3>
                          <Link to={`/article/${post.id}`} title={post.heading}>
                            {post.heading}
                          </Link>
                        </h3>
                        <p>{post.data.substring(0, 150)}...</p> {/* Show the first 150 characters as a preview */}
                        <Link className="read_more_blog" to={`/article/${post.id}`}>
                          Read More <i className="la la-long-arrow-right"></i>
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