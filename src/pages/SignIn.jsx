import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import apiService from '../services/api';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters to check length
    const digitsOnly = phone.replace(/\D/g, '');
    
    // International phone numbers: 7-15 digits (ITU-T E.164 standard)
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return false;
    }
    
    // Allow international formats: +, spaces, dashes, parentheses, dots
    // Must start with + or a digit (country code)
    const phoneRegex = /^[\+]?[\d][\d\s\-\(\)\.]+$/;
    
    return phoneRegex.test(phone.trim());
  };

  const validateForm = () => {
    const errors = {};

    // Phone number is required
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid international phone number (7-15 digits)';
    }

    // Email is optional, but if provided, validate it
    if (formData.email.trim() && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        phone: formData.phone.trim(),
      };
      
      // Email is optional, only include if provided
      if (formData.email.trim()) {
        registrationData.email = formData.email.trim();
      }

      const response = await apiService.registerApplicant(registrationData);

      if (response.success) {
        if (response.isExistingUser) {
          setSuccess('Sign in successful! Redirecting to upcoming events...');
          setTimeout(() => {
            navigate('/events', {
              state: { events: response.events, user: response.user }
            });
          }, 2000);
        } else {
          setError('User not found. Please register first.');
        }
      } else {
        setError(response.message || 'Sign in failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12 sm:py-16"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/19/3f/e0/193fe0d0471ef61b931443398a56da1d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-indigo-900/60 backdrop-blur-[2px]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in pt-8 sm:pt-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-purple-100 font-light">
            Sign in to continue your journey
          </p>
        </div>

        {/* Sign In Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-slide-up">
          {/* Glassmorphism effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            {error && (
              <div className="mb-6 animate-fade-in">
                <Alert type="error" message={error} />
              </div>
            )}

            {success && (
              <div className="mb-6 animate-fade-in">
                <Alert type="success" message={success} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Field - Required */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Phone Number <span className="text-red-300">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1234567890"
                    required
                    className={`w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                      validationErrors.phone
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-2 text-sm text-red-300 font-medium">{validationErrors.phone}</p>
                )}
              </div>

              {/* Email Field - Optional */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address <span className="text-purple-200 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                      validationErrors.email
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-2 text-sm text-red-300 font-medium">{validationErrors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">New to our platform?</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <button
                onClick={() => navigate('/register')}
                className="text-white font-medium hover:text-purple-200 transition-colors duration-200 inline-flex items-center gap-2 group"
              >
                <span>Create an account</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-white/60 text-sm">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-white hover:text-purple-200 underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-white hover:text-purple-200 underline">Privacy Policy</a>
          </p>
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
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
