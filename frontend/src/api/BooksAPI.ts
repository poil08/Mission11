import type { Book } from '../types/Book';

// BooksAPI.ts
// This file contains functions for making API calls to the backend.
// It handles fetching, creating, updating, and deleting books.

export interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL =
  'https://mission13-backend-hvbwgmb4ehh8akc7.westus2-01.azurewebsites.net/Books';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortBy: string,
  selectedCategory: string
): Promise<FetchBooksResponse> => {
  const response = await fetch(
    `${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&category=${selectedCategory}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return await response.json();
};

export const createBook = async (book: Book): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }
};

export const updateBook = async (book: Book): Promise<void> => {
  const response = await fetch(`${API_URL}/${book.bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
};
