// src/HomePage/BlogPosts.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './BlogPosts.css'
import "../common.css";
import "../commonsecond.css";

const BlogPosts = () => {
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
                {/* Slide 1 */}
                <div className="product-wrap">
                  <div className="blog-single-post">
                    <div className="blog-img">
                      <a href="https://example.com" title="Navigating Growth: Analyzing the Impact of Jewar Airport on Noida's Infrastructure">
                        <img src="./800x500landing_lights.jpg" alt="Navigating Growth" />
                      </a>
                      <div className="view-post">
                        <a href="https://example.com" className="view-posts">View Post</a>
                      </div>
                    </div>
                    <div className="post_info">
                      <ul className="post-nfo post_date">
                        <li><i className="la la-calendar"></i> Jan 24, 2024</li>
                      </ul>
                      <h3>
                        <a href="https://example.com" title="">
                          Navigating Growth: Analyzing the Impact of Jewar Airport on Noida's Infrastructure
                        </a>
                      </h3>
                      <p>Noida, a city synonymous with rapid development...</p>
                      <a className="read_more_blog" href="https://example.com">
                        Read More <i className="la la-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="product-wrap">
                  <div className="blog-single-post">
                    <div className="blog-img">
                      <a href="https://example.com" title="Navigating the Evolving Landscape- A Look at the Indian Real Estate Market Forecast">
                        <img src="./800x500smiling_african_american_lady_chair_near_plan_model_house_table.jpg" alt="Evolving Landscape" />
                      </a>
                      <div className="view-post">
                        <a href="https://example.com" className="view-posts">View Post</a>
                      </div>
                    </div>
                    <div className="post_info">
                      <ul className="post-nfo post_date">
                        <li><i className="la la-calendar"></i> Jan 24, 2024</li>
                      </ul>
                      <h3>
                        <a href="https://example.com" title="">
                          Navigating the Evolving Landscape: A Look at the Indian Real Estate Market Forecast
                        </a>
                      </h3>
                      <p>The Indian real estate market, a constantly evolving giant has witnessed...</p>
                      <a className="read_more_blog" href="https://example.com">
                        Read More <i className="la la-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="product-wrap">
                  <div className="blog-single-post">
                    <div className="blog-img">
                      <a href="https://example.com" title="Townmanor Unveils: Your Essential Guide to Home Loans">
                        <img src="./800x500blog1.jpg" alt="Home Loans Guide" />
                      </a>
                      <div className="view-post">
                        <a href="https://example.com" className="view-posts">View Post</a>
                      </div>
                    </div>
                    <div className="post_info">
                      <ul className="post-nfo post_date">
                        <li><i className="la la-calendar"></i> Jan 24, 2024</li>
                      </ul>
                      <h3>
                        <a href="https://example.com" title="">
                          Townmanor Unveils: Your Essential Guide to Home Loans
                        </a>
                      </h3>
                      <p>Just landed your dream home? Fantastic! The next thrilling step: securing a home loan...</p>
                      <a className="read_more_blog" href="https://example.com">
                        Read More <i className="la la-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional slides can be added in a similar fashion */}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
