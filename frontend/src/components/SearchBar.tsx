import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="flex w-full p-4 box-border">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search events..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-darkTeal shadow-md"
      />
      <button className="p-2 text-white">
        <FontAwesomeIcon icon={faSearch} style={{color: "#ffffff",}} className="w-6 h-6 bg-pink rounded p-3" />
      </button>
    </div>
  );
};

export default SearchBar;


