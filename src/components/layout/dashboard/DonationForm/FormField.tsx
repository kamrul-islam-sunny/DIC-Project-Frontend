"use client"
import React from 'react';


interface FormFieldProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  step?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder = '',
  required = false,
  min,
  step,
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          min={min}
          step={step}
          className={`
            w-full px-4 py-2 border rounded-lg 
            focus:ring-2 focus:outline-none transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'}
            ${type === 'number' ? 'appearance-none' : ''}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 transition-all duration-300 animate-fadeIn">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;