import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/19/3f/e0/193fe0d0471ef61b931443398a56da1d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-indigo-900/70 backdrop-blur-[2px]"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
          <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-purple-100">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Terms Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-slide-up">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on our service for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Account</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of 
                any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Uses</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 ml-4">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Content</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
                or other material. You are responsible for the content that you post on or through the service, including its legality, 
                reliability, and appropriateness.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Termination</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 ml-4">
                <li>Excludes all representations and warranties relating to this service and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to 
                the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material 
                we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-white/90 leading-relaxed">
                Email: support@example.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Return to Home</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;
