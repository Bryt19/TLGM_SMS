import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedContent = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('prayers');
  const [currentDate] = useState(new Date());

  // Sample prayer summaries - in real app, this would come from API
  const prayerSummaries = [
    {
      id: 1,
      date: '2024-01-14',
      title: 'Sunday Service Prayer Summary',
      scripture: 'Philippians 4:6-7',
      summary: 'We focused on the power of prayer and thanksgiving. The message emphasized bringing our requests to God with gratitude, knowing that His peace will guard our hearts and minds.',
      keyPoints: [
        'Prayer is a conversation with God, not just a request list',
        'Gratitude transforms our perspective',
        'God\'s peace surpasses all understanding',
        'We should present our requests with thanksgiving'
      ],
      reflection: 'Take time this week to practice gratitude in your prayers. Start each prayer by thanking God for three specific things.'
    },
    {
      id: 2,
      date: '2024-01-07',
      title: 'New Year Prayer Focus',
      scripture: 'Jeremiah 29:11',
      summary: 'As we entered the new year, we prayed for God\'s plans and purposes. The service reminded us that God has plans to prosper us and give us hope and a future.',
      keyPoints: [
        'God has a plan for each of us',
        'His plans are for our good',
        'We can trust in His timing',
        'Hope is found in seeking God'
      ],
      reflection: 'This week, spend time seeking God\'s direction for the year ahead. Write down what you sense God is saying to you.'
    }
  ];

  // Sample devotionals
  const devotionals = [
    {
      id: 1,
      date: currentDate.toISOString().split('T')[0],
      title: 'Morning Light',
      scripture: 'Lamentations 3:22-23',
      content: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.',
      reflection: 'Each morning brings a fresh start. God\'s mercies are not yesterday\'s leftovers—they are brand new, specifically prepared for today. As the sun rises, so does God\'s faithfulness to you.',
      prayer: 'Lord, thank you for this new day and your new mercies. Help me to walk in your faithfulness today and extend that same grace to others I encounter.'
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      title: 'Strength in Weakness',
      scripture: '2 Corinthians 12:9',
      content: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness."',
      reflection: 'Our weaknesses are not obstacles to God\'s work—they are opportunities for His power to shine. When we feel inadequate, that\'s exactly when God\'s strength is most visible.',
      prayer: 'Father, I surrender my weaknesses to you today. Let your power be made perfect in my life, and use me for your glory.'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div 
      className="min-h-screen relative"
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
      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Events</span>
            </button>
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
              Member Resources
            </h1>
            <p className="text-lg text-purple-100 font-light">
              Exclusive content for our community members
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setSelectedTab('prayers')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedTab === 'prayers'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Prayer Summaries
              </button>
              <button
                onClick={() => setSelectedTab('devotionals')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedTab === 'devotionals'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Daily Devotionals
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {selectedTab === 'prayers' && (
              <div className="space-y-6">
                {prayerSummaries.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 animate-slide-up"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{prayer.title}</h2>
                        <p className="text-purple-200 text-sm">{formatDate(prayer.date)}</p>
                      </div>
                      <div className="bg-purple-500/20 px-4 py-2 rounded-lg border border-purple-300/30">
                        <p className="text-purple-200 font-semibold text-sm">{prayer.scripture}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-white/90 leading-relaxed text-lg mb-4">{prayer.summary}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Key Points</h3>
                      <ul className="space-y-2">
                        {prayer.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start text-white/90">
                            <svg className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded-r-lg">
                      <h4 className="text-white font-semibold mb-2">This Week's Reflection</h4>
                      <p className="text-white/90 italic">{prayer.reflection}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'devotionals' && (
              <div className="space-y-6">
                {devotionals.map((devotional) => (
                  <div
                    key={devotional.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 animate-slide-up"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{devotional.title}</h2>
                        <p className="text-purple-200 text-sm">{formatDate(devotional.date)}</p>
                      </div>
                      <div className="bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-300/30">
                        <p className="text-blue-200 font-semibold text-sm">{devotional.scripture}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-white/90 leading-relaxed text-lg italic mb-4">"{devotional.content}"</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Reflection</h3>
                      <p className="text-white/90 leading-relaxed">{devotional.reflection}</p>
                    </div>

                    <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <h4 className="text-white font-semibold mb-2">Prayer</h4>
                      <p className="text-white/90 italic">{devotional.prayer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Events</span>
            </button>
          </div>
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

export default ProtectedContent;
