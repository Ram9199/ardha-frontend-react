/**
 * Configuration settings for the application
 */

// API endpoint for backend services
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://sprakhya.pythonanywhere.com' 
  : 'http://localhost:5000';

// Export configuration values
export default {
  API_BASE_URL
}; 