import { useState } from 'react';

type SearchBarProps = {
  placeholderText: string;
  flex?: string;
  onSearch: (query: string) => void;
};

function SearchBar({ placeholderText, flex, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(inputValue); // Trigger the onSearch function passed from the parent
  };

  return (
    <form className={` ${flex} max-w-full mx-auto`} onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="mb-2 text-base font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          value={inputValue} // Controlled input
          onChange={handleInputChange} // Handle input change
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-customGreen focus:border-customGreen"
          placeholder={placeholderText}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-customDarkGreen hover:bg-customGreen focus:ring-2 focus:outline-none focus:ring-customDarkGreen font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
