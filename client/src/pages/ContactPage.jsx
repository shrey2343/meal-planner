import React, { useState } from 'react';
import VideoBackground from '../components/VideoBackground';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <VideoBackground 
      videoUrl="https://www.shutterstock.com/shutterstock/videos/1112061277/preview/stock-footage-contact-us-internet-website-page-and-hotline-concept-contact-methods.webm"
      overlay="bg-gradient-to-b from-emerald-900/60 via-teal-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            Get In Touch
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-4"></div>
          <p className="text-white/90 text-lg drop-shadow-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/90 font-semibold mb-2 drop-shadow">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2 drop-shadow">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2 drop-shadow">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2 drop-shadow">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 backdrop-blur-md p-4 rounded-xl border border-green-400/30">
                    <FaEnvelope className="text-2xl text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 drop-shadow">Email</h3>
                    <p className="text-white/80 drop-shadow">support@health1st.in</p>
                    <p className="text-white/60 text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 backdrop-blur-md p-4 rounded-xl border border-blue-400/30">
                    <FaPhone className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 drop-shadow">Phone</h3>
                    <p className="text-white/80 drop-shadow">+91 1800-123-4567</p>
                    <p className="text-white/60 text-sm">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 backdrop-blur-md p-4 rounded-xl border border-purple-400/30">
                    <FaMapMarkerAlt className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 drop-shadow">Location</h3>
                    <p className="text-white/80 drop-shadow">Mumbai, Maharashtra</p>
                    <p className="text-white/60 text-sm">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-400/30 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Business Hours</h3>
              <div className="space-y-2 text-white/90 drop-shadow">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-red-400">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Quick Links</h3>
              <div className="space-y-3">
                <a href="/about" className="block text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  📖 About Us
                </a>
                <a href="/terms" className="block text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  📜 Terms & Conditions
                </a>
                <a href="/privacy" className="block text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  🔒 Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
