'use client';
import { useState } from 'react';

export default function PricingSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (planType) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      window.location.href = data.url;
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-4 my-4 justify-items-center">
      <h2 className="text-3xl font-bold mb-4">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        <div>
          <h1>Basic</h1>
          <p>$5/Month</p>
          <p>Basic features</p>
          <button
            onClick={() => handleSubmit('basic')}
            className="text-blue-500 hover:underline"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Choose Basic Plan'}
          </button>
        </div>
        <div>
          <h1>Pro Subscription</h1>
          <p>$10/Month</p>
          <p>Advanced features</p>
          <button
            onClick={() => handleSubmit('pro')}
            className="text-blue-500 hover:underline"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Choose Pro Plan'}
          </button>
        </div>
      </div>
    </section>
  );
}