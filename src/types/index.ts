// API Request Types
export interface RegistrationRequest {
  phone?: string;
  email?: string;
  name?: string;
}

// API Response Types
export interface RegistrationResponse {
  success: boolean;
  message: string;
  user?: User;
  events?: Event[];
  isExistingUser?: boolean;
}

export interface User {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
  registeredAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  location?: string;
  type: 'service' | 'event' | 'meeting';
}

// API Error Response
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  code?: number;
}

// Form Types
export interface RegistrationFormData {
  contact: string; // phone or email
  contactType: 'phone' | 'email';
  name: string;
}

// Component Props Types
export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface InputFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
