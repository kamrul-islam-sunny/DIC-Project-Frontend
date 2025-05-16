"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Heart, Check } from 'lucide-react';
import DonationTypeToggle from './DonationTypeToggle';
import FormField from './FormField';

const DonationForm: React.FC = () => {
  const [donationType, setDonationType] = useState<'oneTime' | 'monthly'>('oneTime');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: {
      donationType: 'oneTime',
    }
  });

  const onSubmit = (data: any) => {
    // Update donation type before submission
    data.donationType = donationType;
    
    // Clear irrelevant fields based on donation type
    if (donationType === 'oneTime') {
      data.monthlyAmount = undefined;
    } else {
      data.oneTimeAmount = undefined;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data:', data);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        reset();
        setSubmitted(false);
      }, 2000);
    }, 1000);
  };

  const handleDonationTypeChange = (type: 'oneTime' | 'monthly') => {
    setDonationType(type);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={`
          bg-white shadow-lg rounded-2xl p-6 sm:p-8 transition-all duration-300
          ${isSubmitting ? 'opacity-70' : ''}
          ${submitted ? 'bg-green-50 border-green-100' : ''}
        `}
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-center">Your donation has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                <Heart size={24} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Make a Donation</h2>
              <p className="text-gray-600 mt-1">Support our cause with your contribution</p>
            </div>
  
            <DonationTypeToggle 
              value={donationType} 
              onChange={handleDonationTypeChange} 
            />
  
            <div className="space-y-4">
              <FormField
                label="Full Name"
                name="name"
                register={register}
                error={errors?.name}
                placeholder="John Doe"
                required
              />
  
              <FormField
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email}
                placeholder="john@example.com"
                required
              />
  
              <FormField
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="+1 (123) 456-7890"
                required
              />
  
              {donationType === 'oneTime' ? (
                <FormField
                  label="Donation Amount"
                  name="oneTimeAmount"
                  type="number"
                  register={register}
                  error={errors.oneTimeAmount}
                  placeholder="100"
                  min={1}
                  step="0.01"
                  required
                />
              ) : (
                <div className="space-y-4">
                  <FormField
                    label="Monthly Amount"
                    name="monthlyAmount.amount"
                    type="number"
                    register={register}
                
                    placeholder="25"
                    min={1}
                    step="0.01"
                    required
                  />
                  
                  <FormField
                    label="Number of Months"
                    name="monthlyAmount.months"
                    type="number"
                    register={register}
               
                    placeholder="12"
                    min={1}
                    step="1"
                    required
                  />
                </div>
              )}
            </div>
  
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full mt-6 py-3 px-4 bg-purple-600 hover:bg-purple-700 
                text-white font-medium rounded-lg transition-all duration-200
                flex items-center justify-center
                ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Complete Donation'
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default DonationForm;