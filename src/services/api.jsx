const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cba6bd75616a.ngrok-free.app';

class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Bypass ngrok interstitial page
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Don't expose HTTP status codes or server details
        let errorMessage = 'Request failed';
        
        try {
          const errorData = await response.json();
          // Only use user-friendly messages, sanitize any technical details
          if (errorData.message && !errorData.message.includes('HTTP') && !errorData.message.includes('status')) {
            errorMessage = errorData.message;
          } else if (errorData.error && !errorData.error.includes('HTTP') && !errorData.error.includes('status')) {
            errorMessage = errorData.error;
          }
        } catch {
          // If response is not JSON, use generic message
        }
        
        // Map status codes to generic messages
        if (response.status >= 500) {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (response.status === 404) {
          errorMessage = 'The requested resource was not found.';
        } else if (response.status === 401 || response.status === 403) {
          errorMessage = 'Authentication required. Please sign in.';
        } else if (response.status >= 400) {
          errorMessage = errorMessage || 'Invalid request. Please check your input and try again.';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle network errors with secure, generic messages
      if (error instanceof TypeError) {
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect. Please check your internet connection and try again.');
        }
        throw new Error('Connection issue detected. Please try again later.');
      }
      
      if (error instanceof Error) {
        // Sanitize error messages to prevent information leakage
        const errorMsg = error.message;
        // Only show generic messages, never expose system details
        if (errorMsg.includes('HTTP') || errorMsg.includes('CORS') || errorMsg.includes('server') || errorMsg.includes('backend')) {
          throw new Error('Service temporarily unavailable. Please try again later.');
        }
        // For other errors, use a generic message
        throw new Error('An error occurred. Please try again.');
      }
      
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

  async registerApplicant(registrationData) {
    return this.request('/api/v1/applicants', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
