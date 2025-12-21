import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import apiService from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });
  const [isExistingMember, setIsExistingMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Comprehensive list of countries in alphabetical order
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
    'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
    'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad',
    'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia',
    'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
    'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
    'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
    'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay',
    'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe', 'Other'
  ].sort();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
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
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        name: `${formData.firstName.trim()}${formData.middleName.trim() ? ' ' + formData.middleName.trim() : ''} ${formData.lastName.trim()}`.trim(),
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        country: formData.country.trim(),
      };

      const response = await apiService.registerApplicant(registrationData);

      if (response.success) {
        if (response.isExistingUser) {
          setSuccess('Already registered! Redirecting to upcoming events...');
          setTimeout(() => {
            navigate('/events', {
              state: { events: response.events, user: response.user }
            });
          }, 2000);
        } else {
          setSuccess('Registration successful! An SMS has been sent to confirm your registration.');
        }
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change - navigate to sign in if checked
  const handleExistingMemberChange = (e) => {
    const checked = e.target.checked;
    setIsExistingMember(checked);
    if (checked) {
      navigate('/signin');
    }
  };

  // For country: implement a textarea for user input, and under it show the dropdown filtered by the input.
  const [countryInput, setCountryInput] = useState('');
  // For dropdown hamburger toggle
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Only show countries matching the input, or all if input is blank
  const filteredCountries = countryInput.trim()
    ? countries.filter((country) =>
        country.toLowerCase().includes(countryInput.trim().toLowerCase())
      )
    : countries;

  // Helper: handle selection from dropdown AND close it
  const handleCountrySelect = (country) => {
    setFormData(prev => ({ ...prev, country }));
    setCountryInput(country);
    setShowCountryDropdown(false);
  };

  // Close dropdown when lost focus, unless focus moves inside dropdown
  const countryDropdownRef = React.useRef();
  const hamburgerRef = React.useRef();

  React.useEffect(() => {
    const handler = (e) => {
      // If click is outside both textarea/input and dropdown and hamburger, close
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target) &&
        !e.target.classList.contains('country-input-area')
      ) {
        setShowCountryDropdown(false);
      }
    };
    if (showCountryDropdown) {
      window.addEventListener('mousedown', handler);
    }
    return () => {
      window.removeEventListener('mousedown', handler);
    };
  }, [showCountryDropdown]);

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden"
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
      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Join Our Community
          </h1>
          <p className="text-lg text-purple-100 font-light">
            Create your account and start your journey with us
          </p>
        </div>

        {/* Register Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-slide-up max-h-[90vh] overflow-y-auto">
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    First Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="John"
                    required
                    className={`w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                      validationErrors.firstName
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-300 font-medium">{validationErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
                    placeholder="Michael"
                    className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 hover:border-gray-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Last Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Doe"
                    required
                    className={`w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                      validationErrors.lastName
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-300 font-medium">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address <span className="text-red-300">*</span>
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
                      required
                      className={`w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                        validationErrors.email
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-300 font-medium">{validationErrors.email}</p>
                  )}
                </div>

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
                      placeholder="+1 (555) 123-4567"
                      required
                      className={`w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                        validationErrors.phone
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-300 font-medium">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Country Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Country <span className="text-red-300">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <textarea
                    value={countryInput}
                    onChange={e => {
                      setCountryInput(e.target.value);
                      setShowCountryDropdown(true);
                    }}
                    onFocus={() => setShowCountryDropdown(true)}
                    placeholder="Type to search your country..."
                    rows={1}
                    className={`w-full pl-12 pr-12 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 resize-none country-input-area ${
                      validationErrors.country
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {/* Chevron dropdown button - properly positioned */}
                  <button
                    type="button"
                    ref={hamburgerRef}
                    aria-label={showCountryDropdown ? "Close country list" : "Open country list"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-1 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-all duration-200 focus:outline-none country-dropdown-hamburger"
                    onClick={() => setShowCountryDropdown(v => !v)}
                    tabIndex={0}
                  >
                    <span className="sr-only">Toggle country dropdown</span>
                    {/* Chevron down/up icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {/* Dropdown under the textarea (controlled by hamburger) */}
                  <div
                    ref={countryDropdownRef}
                    className="w-full mt-1 bg-white/95 backdrop-blur-sm border-2 border-gray-300 rounded-xl shadow-lg max-h-48 overflow-auto absolute left-0 z-20"
                    style={{
                      marginTop: '-.1rem',
                      top: '100%',
                      display: showCountryDropdown && filteredCountries.length > 0 ? 'block' : 'none'
                    }}
                  >
                    <ul>
                      {filteredCountries.map((country) => (
                        <li
                          key={country}
                          className={`px-4 py-2 cursor-pointer hover:bg-purple-100 ${
                            formData.country === country ? 'bg-purple-200 text-purple-800 font-bold' : 'text-gray-900'
                          }`}
                          onClick={() => handleCountrySelect(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {validationErrors.country && (
                  <p className="mt-1 text-sm text-red-300 font-medium">{validationErrors.country}</p>
                )}
              </div>

              {/* Existing Member Checkbox */}
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="existing-member"
                    type="checkbox"
                    checked={isExistingMember}
                    onChange={handleExistingMemberChange}
                    className="h-5 w-5 rounded border-white/30 bg-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="existing-member" className="font-medium text-white cursor-pointer">
                    I am already a member
                  </label>
                  <p className="text-white/70 mt-1">Check this if you already have an account</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || isExistingMember}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
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
                <span className="px-4 bg-transparent text-white/60">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <button
                onClick={() => navigate('/signin')}
                className="text-white font-medium hover:text-purple-200 transition-colors duration-200 inline-flex items-center gap-2 group"
              >
                <span>Sign in to your account</span>
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
            By creating an account, you agree to our{' '}
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

export default Register;
