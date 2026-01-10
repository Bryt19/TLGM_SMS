import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import { Bell, Calendar, Video, Clock, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // State for dummy events
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Countdown Logic
  function calculateTimeLeft() {
    const now = new Date();
    let target = new Date();
    target.setHours(6, 0, 0, 0);

    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    while (target.getDay() === 0 || target.getDay() === 6) {
      target.setDate(target.getDate() + 1);
    }

    const difference = target - now;
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // Dummy API Call Simulation
  useEffect(() => {
    const fetchEvents = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const dummyData = [
        { id: 1, title: "Friday Night Fire", date: "Jan 16, 2026", time: "10:00 PM", category: "Vigil" },
        { id: 2, title: "Prophetic Sunday", date: "Jan 18, 2026", time: "8:00 AM", category: "Main Service" },
        { id: 3, title: "Mid-week Breakthrough", date: "Jan 21, 2026", time: "6:30 PM", category: "Bible Study" },
      ];
      setUpcomingEvents(dummyData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const words = [
    { text: "Start" },
    { text: "your" },
    { text: "day" },
    { text: "with" },
    { text: "Prevailing", className: "text-purple-400" },
    { text: "Hour", className: "text-purple-500" },
  ];

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center px-4 py-20 overflow-x-hidden overflow-y-auto"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/19/3f/e0/193fe0d0471ef61b931443398a56da1d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/80 to-slate-900/90 fixed"></div>
      
      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center mb-24">
        
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-purple-200 text-xs font-medium mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Every Mon - Fri @ 6:00 AM
        </div>

        <TypewriterEffectSmooth words={words} className="justify-center mb-2" />
        
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Join our global community on Zoom for a powerful session of morning prayers, worship, and spiritual awakening.
        </p>

        {/* Countdown Timer Card */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
              <span className="text-3xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-semibold">{unit}</span>
            </div>
          ))}
        </div>
        
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.open('YOUR_ZOOM_LINK_HERE', '_blank')}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Video size={20} />
            Join Prayer Room
          </button>

          <button 
            onClick={() => navigate('/reminder')}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
          >
            <Bell size={20} className="group-hover:animate-ring" />
            Remind Me
          </button>
        </div>

        <p className="mt-8 text-white/40 text-xs flex items-center justify-center gap-2">
          <Calendar size={12} />
          Next meeting: Monday at 6:00 AM GMT
        </p>
      </div>

      {/* NEW: Other Upcoming Events Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-[2px] bg-purple-500"></span>
                Other Upcoming Events
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                    <div 
                        key={event.id} 
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all"></div>
                        
                        <div className="relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3 block">
                                {event.category}
                            </span>
                            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                                {event.title}
                            </h4>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Calendar size={14} className="text-purple-400" />
                                    {event.date}
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Clock size={14} className="text-purple-400" />
                                    {event.time}
                                </div>
                            </div>

                            <button className="mt-6 flex items-center gap-1 text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                                EVENT DETAILS <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                // Skeleton Loaders
                [1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-white/5 animate-pulse rounded-3xl border border-white/10"></div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;