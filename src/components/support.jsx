import React, { useState } from 'react';
import './support.css';
import {
  FaUser,
  FaClipboardList,
  FaFilePdf,
  FaPhoneAlt,
} from 'react-icons/fa';
import hearingImage from './assets/hearingicon.jpg';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const supportItems = [
  { icon: <FaUser />, title: 'My Account', description: 'Manage your hearing aid account and settings.', type: 'link', path: '/profile' },
  { icon: <FaClipboardList />, title: 'Orders', description: 'Track, modify or cancel your hearing aid orders.', type: 'none' },
  { icon: <FaFilePdf />, title: 'Product Manuals', description: 'Download guides and user manuals in PDF format.', type: 'none' },
  { icon: <FaPhoneAlt />, title: 'Contact Us', description: 'Call, email or visit one of our nearby support centers.', type: 'none' },
  { icon: <FaClipboardList />, title: 'Non-order Related Issues', description: 'Get help with your account related issues.', type: 'none' },
  { icon: <FaFilePdf />, title: `FAQ's`, description: 'Find answers to the most common questions about our services.', type: 'scroll', path: 'faq-section' },
];

const faqs = [
  { question: 'How to track my order?', answer: 'Use the tracking ID sent to your email.' },
  { question: 'What is the return policy?', answer: 'Returns accepted within 30 days.' },
  { question: 'Do you offer international shipping?', answer: 'Yes, with additional charges.' },
];

const Support = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleScrollTo = (elementId) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.feedback) {
      setMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            feedback: formData.feedback,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting feedback:', error);
        setMessage('Error submitting feedback. Please try again.');
      } else {
        setMessage('Thank you for your feedback!');
        setFormData({ name: '', email: '', feedback: '' });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-page-wrapper">
      <div className="hero-bg">
        <div className="support-header">
          <h1>We’re here to help</h1>
          <input type="text" placeholder="Search for help..." className="search-input" />
        </div>
      </div>
      <div className="support-main-content">
        <div className="top-card-row">
          {supportItems.map((item, index) => {
            const cardContent = (
              <>
                <div className="icon-circle">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
              </>
            );

            if (item.type === 'link') {
              return (
                <Link to={item.path} key={index} className="support-card-link">
                  <div className="support-card">{cardContent}</div>
                </Link>
              );
            }
            if (item.type === 'scroll') {
              return (
                <div key={index} className="support-card" onClick={() => handleScrollTo(item.path)}>
                  {cardContent}
                </div>
              );
            }
            return (
              <div key={index} className="support-card inactive">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
      <div className="hearing-feedback-section">
        <div className="hearing-image-section">
          <img src={hearingImage} alt="Hearing Aid" />
        </div>
        <div className="feedback-form-section">
          <h3>Submit Your Feedback</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <textarea 
              name="feedback"
              placeholder="Your Feedback" 
              rows="4" 
              value={formData.feedback}
              onChange={handleInputChange}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
            {message && (
              <p className={message.includes('Thank you') ? 'success-message' : 'error-message'}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="support-main-content">
        <div id="faq-section" className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div
              className="faq-item"
              key={index}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-toggle-icon">
                  {activeFAQ === index ? '-' : '+'}
                </span>
              </div>
              {activeFAQ === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
