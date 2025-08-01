tsx
import React, { useState, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white py-4 sticky top-0 z-50 shadow-lg"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-3xl font-poppins font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
        ePortfolio Generator
      </h1>
      <nav className="flex space-x-8 text-sm font-medium" role="navigation">
        <a href="#features" className="hover:text-yellow-300 transition-colors duration-300">Features</a>
        <a href="#how-it-works" className="hover:text-yellow-300 transition-colors duration-300">How It Works</a>
        <a href="#testimonials" className="hover:text-yellow-300 transition-colors duration-300">Testimonials</a>
        <a href="#faq" className="hover:text-yellow-300 transition-colors duration-300">FAQ</a>
        <motion.a
          href="#feedback"
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-300"
        >
          Feedback
        </motion.a>
      </nav>
    </div>
  </motion.header>
);

const Hero = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative bg-[url('/hero-bg.svg')] bg-cover bg-center py-28 text-center overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl md:text-7xl font-poppins font-extrabold text-gray-900 mb-6 leading-tight"
      >
        Elevate Your Career with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">ePortfolio</span>
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
      >
        Craft ATS-friendly CVs, cover letters, and dynamic portfolios to stand out in your job search with unmatched professionalism.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-6"
      >
        <a href="/cv.html" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
          Create Your CV
        </a>
        <a href="/portfolio.html" className="bg-transparent border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all duration-300">
          Build Portfolio
        </a>
      </motion.div>
    </div>
  </motion.section>
);

const Features = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    id="features"
    className="py-24 bg-gray-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-poppins font-bold text-gray-900 text-center mb-16"
      >
        Why Choose ePortfolio Generator?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            icon: <svg className="w-12 h-12 text-indigo-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "ATS-Optimized CVs",
            desc: "Generate CVs designed to pass Applicant Tracking Systems, boosting your interview chances."
          },
          {
            icon: <svg className="w-12 h-12 text-indigo-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
            title: "Professional Cover Letters",
            desc: "Create tailored cover letters that make a lasting impression on hiring managers."
          },
          {
            icon: <svg className="w-12 h-12 text-indigo-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
            title: "Dynamic Portfolios",
            desc: "Showcase your skills and projects with stunning, GitHub-hosted portfolios."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const Testimonials = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    id="testimonials"
    className="py-24 bg-gradient-to-b from-gray-100 to-gray-200"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-poppins font-bold text-gray-900 text-center mb-16"
      >
        What Our Users Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { quote: "ePortfolio Generator helped me land my dream job with a professional CV and portfolio!", name: "Jane Doe", role: "Software Engineer" },
          { quote: "The cover letter tool was a game-changer. It’s so easy to create polished documents.", name: "John Smith", role: "Marketing Manager" },
          { quote: "My GitHub portfolio looks stunning and showcases my work beautifully.", name: "Emily Chen", role: "Designer" }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white p-6 rounded-2xl shadow-xl"
          >
            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
            <p className="text-sm font-semibold text-gray-900">{testimonial.name}, {testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const HowItWorks = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    id="how-it-works"
    className="py-24 bg-white"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-poppins font-bold text-gray-900 text-center mb-16"
      >
        How It Works
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { step: "1", title: "Enter Your Details", desc: "Use our intuitive forms to input your details for CVs, cover letters, or portfolios." },
          { step: "2", title: "Preview & Generate", desc: "Instantly preview your documents and download professional PDFs." },
          { step: "3", title: "Share with Employers", desc: "Save to GitHub and share your professional portfolio effortlessly." }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">{step.step}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const FAQ = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    id="faq"
    className="py-24 bg-gray-50"
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-poppins font-bold text-gray-900 text-center mb-16"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="space-y-8">
        {[
          { question: "What is ePortfolio Generator?", answer: "A professional tool to create ATS-friendly CVs, cover letters, and GitHub-hosted portfolios." },
          { question: "How do I save my documents?", answer: "Your documents are securely saved to your GitHub account after creation." },
          { question: "Is it free to use?", answer: "Yes, document creation is free with a 21-day portfolio hosting trial. Extend for £10/year." }
        ].map((faq, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const BuyMeACoffee = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    id="support"
    className="py-24 bg-gradient-to-b from-indigo-50 to-white"
    role="region"
    aria-labelledby="support-heading"
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        id="support-heading"
        className="text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 mb-6"
      >
        Support Our Mission
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
      >
        Love ePortfolio Generator? Your support keeps us innovating!
      </motion.p>
      <motion.a
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        href="https://www.buymeacoffee.com/theidealcag"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-600 transition-all duration-300"
        aria-label="Support ePortfolio Generator on BuyMeACoffee"
      >
        Buy Us a Coffee
      </motion.a>
    </div>
  </motion.section>
);

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your name.';
    if (!formData.email) newErrors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.feedback) newErrors.feedback = 'Please provide your feedback.';
    if (formData.feedback.length > 1000) newErrors.feedback = 'Feedback is too long (max 1000 characters).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please fill out all required fields correctly.');
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setIsLoading(true);
    document.getElementById('loading')?.classList.add('active');
    setMessage('Submitting your feedback...');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Thank you for your feedback! Redirecting to success page...');
        setFormData({ name: '', email: '', feedback: '' });
        setTimeout(() => {
          window.location.href = '/feedback-success.html';
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(`Oops! Something went wrong: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      setMessage('Sorry, we couldn’t connect to the server. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
      document.getElementById('loading')?.classList.remove('active');
      setTimeout(() => setMessage(''), 5000);
    }
  }, [formData]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="feedback"
      className="py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          id="feedback-form-heading"
          className="text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 text-center mb-12"
        >
          We Value Your Feedback
        </motion.h2>
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-indigo-50 p-8 rounded-2xl shadow-xl"
          role="form"
          aria-labelledby="feedback-form-title"
        >
          <h3 id="feedback-form-title" className="sr-only">Feedback Form</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 bg-white"
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    id="name-error"
                    className="text-sm text-red-600 mt-2"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 bg-white"
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    id="email-error"
                    className="text-sm text-red-600 mt-2"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Your Feedback</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 bg-white"
                rows={6}
                maxLength={1000}
                required
                aria-required="true"
                aria-invalid={errors.feedback ? 'true' : 'false'}
                aria-describedby={errors.feedback ? 'feedback-error' : 'feedback-desc'}
              />
              <p id="feedback-desc" className="text-sm text-gray-500 mt-2">Share your thoughts to help us improve (max 1000 chars).</p>
              <AnimatePresence>
                {errors.feedback && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    id="feedback-error"
                    className="text-sm text-red-600 mt-2"
                  >
                    {errors.feedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-col md:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${isLoading ? 'opacity-50' : ''}`}
              disabled={isLoading || Object.keys(errors).length > 0}
              aria-label="Submit feedback"
              aria-disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                setFormData({ name: '', email: '', feedback: '' });
                setErrors({});
                setMessage('Form cleared successfully!');
                setTimeout(() => setMessage(''), 3000);
              }}
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Clear form"
              disabled={isLoading}
            >
              Clear Form
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-6 text-center text-sm ${message.includes('Error') || message.includes('Oops') || message.includes('Sorry') ? 'text-red-600' : 'text-green-600'}`}
                aria-live="polite"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </motion.section>
  );
};

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-indigo-900 text-white py-12"
    role="contentinfo"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">ePortfolio Generator</h3>
          <p className="text-gray-300 text-sm">Empowering your career with professional CVs, cover letters, and portfolios.</p>
        </div>
        <div>
          <h3 className="text-lg font-poppins font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/index.html" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Home</a></li>
            <li><a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Features</a></li>
            <li><a href="#testimonials" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Testimonials</a></li>
            <li><a href="#faq" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">FAQ</a></li>
            <li><a href="#feedback" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Feedback</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-poppins font-semibold text-white mb-4">Connect</h3>
          <ul className="space-y-3">
            <li><a href="https://github.com/Theidealcareerpro" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">GitHub</a></li>
            <li><a href="mailto:theidealcareerpro@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Contact Us</a></li>
            <li><a href="https://www.buymeacoffee.com/theidealcag" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">Buy Us a Coffee</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-300 text-sm">
        <p>© {new Date().getFullYear()} ePortfolio Generator. All rights reserved.</p>
      </div>
    </div>
  </motion.footer>
);

const App = () => (
  <div>
    <Header />
    <Hero />
    <Features />
    <Testimonials />
    <HowItWorks />
    <FAQ />
    <BuyMeACoffee />
    <FeedbackForm />
    <Footer />
  </div>
);

try {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
} catch (error) {
  console.error('Error in index.tsx:', error.message, error.stack);
  document.getElementById('error').className = 'error-message error';
}
