import React, { useState } from 'react';
import axios from 'axios';

function MinMaxAverage() {
  const [currency, setCurrency] = useState('');
  const [quotations, setQuotations] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleMinMaxAverage = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/min_max_average?currency=${currency}&quotations=${quotations}`);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error occurred');
      setResult(null);
    }
  };

  return (
    <div className='box'>
      <h2>Max and Min Average Value</h2>
      <input
        type="text"
        placeholder="Currency Code"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Quotations"
        value={quotations}
        onChange={(e) => setQuotations(e.target.value)}
      />
      <button onClick={handleMinMaxAverage}>Get Min/Max Average</button>
      {result && (
        <div>
          <h3>Result</h3>
          <pre>
          <p>Currency: {result.currency}</p>
          <p>Max average: {result.max_average}</p>
          <p>Min average: {result.min_average}</p>
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

export default MinMaxAverage;
