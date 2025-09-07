import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import nobg from './assets/products/nobg.png'; // Make sure this path is correct
import './hero2.css';

const products = [
  { id: 1, name: 'Hearing Aid for Everything', desc: 'Compact and powerful hearing support', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.2 },
  { id: 2, name: 'Hearing Aid for Everything', desc: 'Advanced digital sound processor', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.5 },
  { id: 3, name: 'Hearing Aid for Everything', desc: 'Discreet in-ear model for daily use', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.0 },
  { id: 4, name: 'Hearing Aid for Everything', desc: 'Rechargeable long-lasting battery', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.3 },
  { id: 5, name: 'Hearing Aid for Everything', desc: 'Noise cancelling modern design', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.1 },
  { id: 6, name: 'Hearing Aid for Everything', desc: 'Smartphone compatible hearing aid', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.4 },
  { id: 7, name: 'Hearing Aid for Everything', desc: 'Lightweight and ergonomic', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.0 },
  { id: 8, name: 'Hearing Aid for Everything', desc: 'High-fidelity hearing clarity', price: 4299, originalPrice: 6299, offer: '32% off', rating: 4.2 },
];

const TopPicks = () => {
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerView = 4;

  const handleNext = () => {
    if (startIndex + cardsPerView < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + cardsPerView);

  return (
    <div className="top-picks-wrapper">
      <div className="top-picks-container">
        <h2 className="section-title">Browse Products</h2>

        <div className="carousel-wrapper">
          {startIndex > 0 && (
            <button className="arrow left" onClick={handlePrev}>
              <ChevronLeft size={22} />
            </button>
          )}

          <div className="product-slider">
            {visibleProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={nobg} alt={product.name} className="product-img" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>

                <div className="price-section">
                  <span className="price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="offer">{product.offer}</span>
                </div>

                <div className="rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < Math.round(product.rating) ? '#ffc107' : 'none'}
                      stroke={index < Math.round(product.rating) ? '#ffc107' : '#ccc'}
                    />
                  ))}
                  <span className="rating-num">{product.rating.toFixed(1)}</span>
                </div>

                <button className="buy-btn">
                  Buy Now
                  <ChevronRight className="chevron-icon" size={16} />
                </button>
              </div>
            ))}
          </div>

          {startIndex + cardsPerView < products.length && (
            <button className="arrow right" onClick={handleNext}>
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
