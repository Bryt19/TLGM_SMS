import axios from 'axios';

// Set up the base configuration for Axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api', // Adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  /**
   * Sends user contact info to the backend to schedule a prayer reminder.
   * Payload: { phone: string, email: string }
   */
  registerReminder: async (data) => {
    try {
      const response = await apiClient.post('/reminders/register', {
        phone: data.phone.trim(),
        email: data.email.trim() || null,
        reminder_type: 'morning_prayer',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Automatically detects user's timezone
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error registering reminder:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to set reminder. Please try again.',
      };
    }
  },

  /**
   * Fetches the list of other upcoming events for the Home page grid.
   */
  getUpcomingEvents: async () => {
    try {
      const response = await apiClient.get('/events/upcoming');
      // Expecting the backend to return { events: [...] }
      return { success: true, events: response.data.events };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        success: false,
        message: 'Could not load upcoming events.',
        events: [], // Return empty array to prevent map errors in UI
      };
    }
  },
};

export default apiService;