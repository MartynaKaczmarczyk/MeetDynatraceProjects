import React, { useState } from 'react';
import axios from 'axios';

function AverageRate() {
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAverageRate = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/average_rate?date=${date}&currency=${currency}`);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error occurred');
      setResult(null);
    }
  };

  return (
    <div className='box'>
      <h2>Average Exchange Rate</h2>
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Currency Code"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <button onClick={handleAverageRate}>Get Average Rate</button>
      {result && (
        <div>
          <h3>Result</h3>
          <pre>
          <p>Date: {result.date}</p>
          <p>Currency: {result.currency}</p>
          <p>Average rate: {result.average_rate}</p>
          </pre>
        </div>
      )}
      {error && (
        <div className="error">
          <h3>Error</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default AverageRate;
