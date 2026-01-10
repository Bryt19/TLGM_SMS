import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

const RemindMe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Dummy API Call
  const handleNotifyMe = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.phone && !formData.email) {
      setValidationError('Please provide at least a phone number or email.');
      return;
    }

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/'); // Redirect back to the countdown page
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/19/3f/e0/193fe0d0471ef61b931443398a56da1d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/80 to-slate-900/95 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-4">
            <Bell className="text-purple-400" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Never Miss a Prayer</h1>
          <p className="text-purple-100/70 font-light">
            We'll send you a reminder 30 minutes before we start.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleNotifyMe} className="space-y-5">
            {/* Phone Input */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-2 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input
                  type="tel"
                  placeholder="+233..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-white/30"><span className="px-2 bg-transparent">OR</span></div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="grace@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {validationError && (
              <p className="text-red-400 text-xs text-center font-medium animate-pulse">{validationError}</p>
            )}

            <button
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Set Reminder <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-[11px]">
            <ShieldCheck size={14} />
            <span>Your data is encrypted and used only for prayer reminders.</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-white/60 text-sm hover:text-white transition-colors"
        >
          Back to Countdown
        </button>
      </div>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're All Set!</h2>
            <p className="text-gray-400 text-sm mb-6">
              We've scheduled your reminder. You'll receive a notification 30 minutes before the 6:00 AM session starts.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Great, thank you!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindMe;