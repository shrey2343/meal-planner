import VideoBackground from '../components/VideoBackground';
import { FaHeart, FaUsers, FaRocket, FaLeaf } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <VideoBackground 
      videoUrl="https://www.shutterstock.com/shutterstock/videos/3861294479/preview/stock-footage-contact-us-concept-animation-video-transparent.webm"
      overlay="bg-gradient-to-b from-teal-900/60 via-cyan-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-6 text-center drop-shadow-2xl">
            About Health1st
          </h1>
          
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-8"></div>

          <div className="space-y-6 text-white/90 text-lg leading-relaxed drop-shadow-lg">
            <p>
              Welcome to <span className="text-green-400 font-bold">Health1st</span>, your complete wellness companion powered by cutting-edge AI technology. We believe that achieving your health and fitness goals should be simple, personalized, and accessible to everyone.
            </p>

            <p>
              Our mission is to revolutionize the way people approach their health journey by combining artificial intelligence with expert nutritional guidance and fitness planning. Whether you're looking to lose weight, gain muscle, or simply maintain a healthy lifestyle, Health1st is here to support you every step of the way.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <FaHeart className="text-4xl text-red-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-white/80">To make healthy living effortless and enjoyable for everyone through smart technology and personalized guidance.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <FaUsers className="text-4xl text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Community</h3>
                <p className="text-white/80">Join thousands of users who have transformed their lives with Health1st's personalized approach to wellness.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <FaRocket className="text-4xl text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-white/80">Powered by Google's Gemini AI, we deliver cutting-edge meal planning and nutrition recommendations.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <FaLeaf className="text-4xl text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-white/80">We promote sustainable eating habits and healthy lifestyle choices that benefit both you and the planet.</p>
              </div>
            </div>

            <p>
              Health1st offers a comprehensive suite of features including AI-powered meal planning, personalized workout routines, nutrition tracking, and a curated marketplace for healthy products. Our platform adapts to your unique needs, preferences, and goals, making it easier than ever to stay on track.
            </p>

            <p className="text-center text-xl font-semibold text-green-300 mt-8">
              Join us on your journey to a healthier, happier you! 🌱
            </p>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
