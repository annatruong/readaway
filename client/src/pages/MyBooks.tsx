import React, { useState } from 'react';
import { Sidebar, SearchBar, PageTitle } from '../components';
const MyBooks: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64 sm:flex">
        <PageTitle flex={'sm:flex-none'} title={'My Books'} />
        <SearchBar flex={'sm:flex-1'} placeholderText={'Enter a book title ...'} />
      </div>
    </div>
  );
};

export default MyBooks;
