import React from 'react';
import './App.css';
import AverageRate from './components/AverageRate';
import MinMaxAverage from './components/MinMaxAverage';
import MajorDifference from './components/MajorDifference';

function App() {
  return (
    <div className="App">
      <h1>NBP Exchange Rates</h1>
      <AverageRate />
      <MinMaxAverage />
      <MajorDifference />
    </div>
  );
}

export default App;
