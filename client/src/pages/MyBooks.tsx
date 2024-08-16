import React from 'react';
import { Sidebar, SearchBar } from '../components';
const MyBooks: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <SearchBar placeholderText={'Enter a book title ...'} />
      </div>
    </div>
  );
};

export default MyBooks;
