import React, { useState, useEffect } from 'react';
import { Sidebar, SearchBar, PageTitle, Card } from '../components';
import { BookListItem } from '../types/booksType';
import axios from 'axios';
const booksUrl = import.meta.env.VITE_BOOKS_BASE_URL;
import { ErrorMessage } from '../components';

const MyBooks: React.FC = () => {
  const [error, setError] = useState('');
  const [userBooks, setUserBooks] = useState<BookListItem[]>([]);
  const [searchResults, setSearchResults] = useState<BookListItem[]>([]);
  const [viewMode, setViewMode] = useState<'userBooks' | 'searchResults'>('searchResults');

  useEffect(() => {
    setError('');
    // Reset viewMode to 'userBooks' when the component mounts (or when 'My Books' is clicked in the navbar)
    setViewMode('userBooks');
  }, []); // Only runs on initial mount

  const handleSearch = async (query: string) => {
    setError('');
    // Perform API search here
    try {
      const response = await axios.get(`${booksUrl}/api/books/search?title=${query}`, { withCredentials: true });
      setSearchResults(response.data);
      setViewMode('searchResults');
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.data) {
        setError(error.response.data);
      } else {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64 md:flex">
        <PageTitle flex={'md:flex-none'} title={viewMode === 'userBooks' ? 'My Books' : 'Search Results'} />
        <SearchBar flex={'md:flex-1'} placeholderText={'Enter a book title ...'} onSearch={handleSearch} />
      </div>
      <div className="p-4 sm:ml-64">
        {error && <ErrorMessage message={error} />}
        {viewMode === 'userBooks' ? (
          userBooks.length > 0 ? (
            userBooks.map(book => (
              <Card
                key={book.selfLink}
                title={book.title}
                authors={book.authors}
                description={book.shortDescription}
                thumbnail={book.thumbnailImage || undefined}
                publisher={book.publisher}
                publisherDate={book.publishedDate || undefined}
              />
            ))
          ) : (
            <p>No books found in your collection.</p>
          )
        ) : searchResults.length > 0 ? (
          searchResults.map(book => (
            <Card
              key={book.selfLink}
              title={book.title}
              authors={book.authors}
              description={book.shortDescription}
              thumbnail={book.thumbnailImage || undefined}
              publisher={book.publisher}
              publisherDate={book.publishedDate || undefined}
              onAdd={() => {
                setUserBooks([...userBooks, book]);
                setViewMode('userBooks'); // switch back to user books after adding
              }}
            />
          ))
        ) : (
          <p>No results found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
