import React, { useState } from 'react';

const FilterBtn = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('Recent');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onFilterChange(value);
  };

  return (
    <select
    value={selectedOption}
    onChange={handleChange}
    className="bg-white p-1.5  text-sm font-normal"
  >
    <option value="Recent" className='bg-white font-normal border-none'>Recent</option>
    <option value="Oldest" className='bg-white font-normal'>Oldest</option>
  </select>
  
  );
};

export default FilterBtn;
