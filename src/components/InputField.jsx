import React from 'react';

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 text-base border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
          error
            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;
