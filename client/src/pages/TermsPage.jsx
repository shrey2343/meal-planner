import React from 'react';
import VideoBackground from '../components/VideoBackground';

export default function TermsPage() {
  return (
    <VideoBackground 
      videoUrl="https://www.shutterstock.com/shutterstock/videos/3943475269/preview/stock-footage-terms-and-conditions-for-employers-concept-digital-contract-that-describes-the-terms-and-conditions.webm"
      overlay="bg-gradient-to-b from-blue-900/60 via-indigo-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-6 text-center drop-shadow-2xl">
            Terms & Conditions
          </h1>
          
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-8"></div>

          <div className="space-y-8 text-white/90 leading-relaxed drop-shadow-lg">
            <p className="text-sm text-white/70">Last Updated: December 24, 2025</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Health1st ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use of Service</h2>
              <p className="mb-3">
                Health1st provides AI-powered meal planning, fitness guidance, and wellness resources. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to interfere with or disrupt the Service</li>
                <li>Not use automated systems to access the Service without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Health Disclaimer</h2>
              <p>
                The meal plans, exercise suggestions, and health information provided by Health1st are for informational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before starting any diet, exercise program, or making health-related decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Content</h2>
              <p>
                You retain ownership of any content you submit to Health1st. By submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, and display your content in connection with the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Purchases and Payments</h2>
              <p className="mb-3">
                When making purchases through our marketplace:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Payment must be made at the time of purchase</li>
                <li>We reserve the right to refuse or cancel orders</li>
                <li>Refund policies apply as stated in our Refund Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Health1st, including but not limited to text, graphics, logos, and software, are owned by Health1st and protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p>
                Health1st shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service. Our total liability shall not exceed the amount you paid for the Service in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
                <br />
                <span className="text-green-400 font-semibold">support@health1st.in</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
