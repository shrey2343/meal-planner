import React from 'react';
import VideoBackground from '../components/VideoBackground';
import { FaShieldAlt, FaLock, FaUserSecret, FaCookie } from 'react-icons/fa';

export default function PrivacyPage() {
  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2016/02/15/2176-155747466_large.mp4"
      overlay="bg-gradient-to-b from-purple-900/60 via-violet-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <FaShieldAlt className="text-6xl text-green-400 mx-auto mb-4 drop-shadow-2xl" />
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-500 mx-auto"></div>
          </div>

          <div className="space-y-8 text-white/90 leading-relaxed drop-shadow-lg">
            <p className="text-sm text-white/70">Last Updated: December 24, 2025</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaLock className="text-blue-400" />
                1. Information We Collect
              </h2>
              <p className="mb-3">We collect information to provide better services to our users:</p>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-3">
                <p><strong className="text-green-400">Personal Information:</strong> Name, email address, phone number, and profile details</p>
                <p><strong className="text-green-400">Health Data:</strong> Dietary preferences, fitness goals, body measurements, and activity levels</p>
                <p><strong className="text-green-400">Usage Data:</strong> How you interact with our Service, including meal plans generated and exercises viewed</p>
                <p><strong className="text-green-400">Payment Information:</strong> Billing details and transaction history (processed securely through third-party payment processors)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">Your information helps us:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate personalized meal plans and fitness recommendations</li>
                <li>Improve and optimize our AI algorithms</li>
                <li>Process your orders and manage your account</li>
                <li>Send you important updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaUserSecret className="text-purple-400" />
                3. Data Protection & Security
              </h2>
              <p className="mb-3">
                We take your privacy seriously and implement industry-standard security measures:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="font-semibold text-green-400 mb-2">🔐 Encryption</p>
                  <p className="text-sm">All data transmitted is encrypted using SSL/TLS protocols</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="font-semibold text-blue-400 mb-2">🛡️ Secure Storage</p>
                  <p className="text-sm">Your data is stored on secure servers with restricted access</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="font-semibold text-purple-400 mb-2">👤 Access Control</p>
                  <p className="text-sm">Only authorized personnel can access user data</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="font-semibold text-pink-400 mb-2">🔄 Regular Audits</p>
                  <p className="text-sm">We conduct regular security audits and updates</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="mb-3">
                We do not sell your personal information. We may share your data only in these circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party services that help us operate (payment processors, hosting providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaCookie className="text-yellow-400" />
                5. Cookies & Tracking
              </h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and remember your preferences. You can control cookie settings through your browser, though some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <ul className="space-y-2">
                  <li>✅ Access your personal data</li>
                  <li>✅ Correct inaccurate information</li>
                  <li>✅ Request deletion of your data</li>
                  <li>✅ Export your data in a portable format</li>
                  <li>✅ Opt-out of marketing communications</li>
                  <li>✅ Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <p>
                Our Service integrates with third-party services (Google Gemini AI, payment processors). These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
              <p>
                Health1st is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account at any time, after which we will delete or anonymize your data within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through a prominent notice on our Service. Your continued use after changes indicates acceptance of the updated policy.
              </p>
            </section>

            <section className="bg-green-500/10 backdrop-blur-md p-6 rounded-xl border-2 border-green-400/30">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="mb-2">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <p className="text-green-400 font-semibold text-lg">
                📧 support@health1st.in
              </p>
            </section>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
