import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-xl border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-white text-3xl font-bold drop-shadow-lg mb-3">
              🏋️ Health1st
            </h2>
            <p className="text-white/80 drop-shadow leading-relaxed">
              Delight your body. Elevate your routine. Your complete wellness companion.
            </p>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold drop-shadow-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  📖 About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  📜 Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  📧 Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-green-400 transition-colors drop-shadow">
                  🔒 Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold drop-shadow-lg mb-4">Contact</h4>
            <p className="text-white/80 drop-shadow mb-4 flex items-center gap-2">
              <FaEnvelope className="text-green-400" /> 
              support@health1st.in
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-white/80 hover:text-pink-400 transition-all transform hover:scale-110 text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                className="text-white/80 hover:text-blue-400 transition-all transform hover:scale-110 text-2xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="text-white/80 hover:text-blue-500 transition-all transform hover:scale-110 text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/80 drop-shadow">
            © {new Date().getFullYear()} Health1st. Made with 💚 in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
