import React from 'react';
import "./FilterBar.css";

const FilterBar = ({ filters, handleFilterChange }) => {
  const workoutTypes = ['Cardio', 'Fitness', 'Pilates', 'Yoga', 'Cycling', 'Swimming'];
  const intensities = ['Low', 'Moderate', 'High'];
  const locationTypes = ['outdoors', 'gym'];

  return (
    <div className="filter-bar">
      <label>Type:</label>
      <select name="type" value={filters.type} onChange={handleFilterChange}>
        <option value="">All</option>
        {workoutTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label>Intensity:</label>
      <select name="intensity" value={filters.intensity} onChange={handleFilterChange}>
        <option value="">All</option>
        {intensities.map((intensity) => (
          <option key={intensity} value={intensity}>{intensity}</option>
        ))}
      </select>

      <label>Zip Code:</label>
      <input placeholder='enter zip code' type="text" name="zip_code" value={filters.zip_code} onChange={handleFilterChange} />

      <label>Location:</label>
      <select name="location" value={filters.locationTypes} onChange={handleFilterChange}>
        <option value="">All</option>
        {locationTypes.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

    </div>
    
  );
};

export default FilterBar;
