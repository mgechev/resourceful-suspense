import React, { useState, useEffect, useRef } from 'react';
import './SearchInput.css';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  disabled?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounce = 300,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (internalValue !== value) onChange(internalValue);
    }, debounce);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line
  }, [internalValue]);

  return (
    <div className="search-input-wrapper">
      <input
        className="search-input"
        type="text"
        value={internalValue}
        onChange={e => setInternalValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Search"
      />
      {internalValue && !disabled && (
        <button
          className="clear-btn"
          onClick={() => setInternalValue('')}
          aria-label="Clear search"
          tabIndex={-1}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput; 