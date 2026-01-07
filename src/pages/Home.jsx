import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';

const Home = () => {
  const navigate = useNavigate();

  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "TLGM",
    },
    {
      text: "SMS",
      className: "text-purple-500 dark:text-purple-500",
    },
    {
      text: "Community",
    },
  ];

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/19/3f/e0/193fe0d0471ef61b931443398a56da1d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-purple-800/80"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[40rem]">
          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base mb-8 font-medium">
            Stay connected with our community. Get updates on events, services, and spiritual resources.
          </p>
          
          {/* Typewriter Effect */}
          <TypewriterEffectSmooth 
            words={words}
            className="mb-8"
            cursorClassName="bg-purple-500"
          />
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
            <button 
              onClick={() => navigate('/register')}
              className="w-40 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Join now
            </button>
            <button 
              onClick={() => navigate('/signin')}
              className="w-40 h-10 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 border-2 border-white/30 hover:bg-white hover:border-white/50 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
