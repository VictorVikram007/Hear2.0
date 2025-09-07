import React from "react";
import Slider from "react-slick";
import "./blogcarousel.css";

// Slick carousel CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Blog slides data
const blogs = [
  {
    id: 1,
    title: "Blog Post 1",
    image: require("./assets/blog1.jpg"),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod."
  },
  {
    id: 2,
    title: "Blog Post 2",
    image: require("./assets/blog2.avif"),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod."
  },
  {
    id: 3,
    title: "Blog Post 3",
    image: require("./assets/blog3.jpeg"),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod."
  },
];

const BlogCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    fade: false,
  };

  return (
    <div className="blog-carousel-container">
      <Slider {...settings}>
        {blogs.map(blog => (
          <div className="blog-slide" key={blog.id}>
            <div className="slide-content">
              <div className="image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-image" />
              </div>
              <div className="blog-text">
                <h2 className="blog-title">{blog.title}</h2>
                <p>{blog.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogCarousel;
