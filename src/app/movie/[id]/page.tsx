"use client";

import React, { useState } from 'react';

export default function MovieBookingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setSuccess('Booking confirmed! You will receive an SMS shortly.');
        setName('');
        setPhone('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send SMS.');
      }
    } catch {
      setError('Failed to send SMS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f1eeea] text-[#323031] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-4 text-center text-red-600 font-semibold">
          Note: The SMS will be sent only if your phone number is a verified number.
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Book Your Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c84d38]"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="phone">Phone number</label>
            <input
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c84d38]"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              pattern="^[0-9]{10,15}$"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#c84d38] text-white py-2 rounded font-semibold hover:bg-[#a53a28] transition"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
        {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </main>
  );
}
