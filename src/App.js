import React from 'react';
import Header from './components/header';
import InputForm from './components/inputForm';
import Table from './components/table'
import './App.css'

const App = () => {
  const handleScrape = (input) => {
    // Handle the scraping logic here
    console.log('Scraping URL:', input);
  };

  return (
    <div className="app">
      <Header />
      <InputForm onSubmit={handleScrape} />
      <Table />
    </div>
  );
};

export default App;