import React, { useState, useEffect } from 'react';

const MOTIVATIONAL_QUOTES = [
  "Logic is the beginning of wisdom, not the end.",
  "The only way to go fast is to go well.",
  "Simple things should be simple, complex things should be possible.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "The future belongs to those who learn more skills and combine them.",
  "Focus on being productive instead of busy.",
  "Success is not final; failure is not fatal: It is the courage to continue that counts."
];

export default function QuoteBanner() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      // fetch API from Unit 4
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setAdvice(data.quote);
    } catch (err) {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      setAdvice(MOTIVATIONAL_QUOTES[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdvice(); }, []);

  return (
    <div className="quote-banner">
      <span className="quote-icon">📟</span>
      <div className="quote-text">
        <span className="quote-prompt">&gt;</span>
        {loading ? "Initializing intelligence feed..." : `"${advice}"`}
      </div>
      <button 
        onClick={fetchAdvice} 
        disabled={loading}
        className="btn-refresh"
        title="Refresh feed"
      >
        {loading ? "⌛" : "🔄"}
      </button>
    </div>
  );
}
