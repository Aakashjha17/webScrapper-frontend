import React from 'react';
import { postUrl } from '../api';

const InputForm = ({ onSubmit }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = event.target.elements.input.value;
    try {
      const response = await postUrl({ url: input });
      onSubmit(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="Enter URL" />
      <button type="submit">Get Insights</button>
    </form>
  );
};

export default InputForm;